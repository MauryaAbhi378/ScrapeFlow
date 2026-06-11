import { AppNode, AppNodeMissingInputs } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";
import { getInvalidInputs } from "../helper/getInvalidInputs";

export enum flowToExecutionPlanValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS",
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: flowToExecutionPlanValidationError;
    invalidElements?: AppNodeMissingInputs[];
  };
};

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[],
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint,
  );

  if (!entryPoint) {
    return {
      error: {
        type: flowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const inputsWithError: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithError.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs,
    });
  }
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        //Node already put in execution plan
        continue;
      }

      const inValidInputs = getValidInputs(currentNode, edges, planned);

      if (inValidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          //If all incoming incomers/edges are planned and there are still invalid inputs
          //this means that this particular node has an invalid input
          //which means that the workflow is invalid

          console.error("Invalid inputs", currentNode.id, inValidInputs);
          inputsWithError.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }

  if (inputsWithError.length > 0) {
    return {
      error: {
        type: flowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithError,
      },
    };
  }

  return { executionPlan };
}

function getValidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputaValue = node.data.inputs[input.name];
    const inputValueProvided = inputaValue?.length > 0;
    if (inputValueProvided) {
      continue;
    }

    //If value is not provided by user then we need to check
    // if there is an output linked to current input

    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name,
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);
    if (requiredInputProvidedByVisitedOutput) {
      //this inputs is required and we have a valid for it
      //provided by a task that is already planned
      continue;
    } else if (!input.required) {
      //the input is not required but there is an output linked to it
      //then we need to be sure that the output is already planned
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        //the output is providing a value to input the input is fine
        continue;
      }
    }

    invalidInputs.push(input.name);
  }
  return invalidInputs;
}
