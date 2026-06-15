import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "../workflow/task/registry";

/**
 * Validation rules:
 * - Required inputs must either have a value provided or be linked to a planned output
 * - Optional inputs without values can be skipped
 * - If optional input is linked to an output, the source must be planned
 */
export function getInvalidInputs(
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
): string[] {
  const invalidInputs: string[] = [];
  const taskInputs = TaskRegistry[node.data.type].inputs;

  for (const input of taskInputs) {
    // Check if user has provided a value for this input
    const inputValue = node.data.inputs[input.name];
    const isValueProvided = inputValue && inputValue.length > 0;

    if (isValueProvided) {
      // Value is provided by user, input is valid
      continue;
    }

    // Value not provided, check if it's linked to an output
    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    // Check if this is a required input
    if (input.required) {
      // For required inputs, either a user value or linked output from a planned node is needed
      if (
        inputLinkedToOutput &&
        planned.has(inputLinkedToOutput.source)
      ) {
        // Required input is satisfied by a planned output
        continue;
      } else {
        // Required input is not satisfied
        invalidInputs.push(input.name);
      }
    } else {
      // For optional inputs, if there's no linked output, it's fine
      if (!inputLinkedToOutput) {
        continue;
      }

      // If there is a linked output, the source must be planned
      if (planned.has(inputLinkedToOutput.source)) {
        continue;
      } else {
        // Optional input has a link but source is not planned yet
        invalidInputs.push(input.name);
      }
    }
  }

  return invalidInputs;
}
