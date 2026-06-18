"use client";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/WorkFlows/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow created", { id: "create-workflow" });
      router.push(`/workflow/editor/${data.id}`);
    },
    onError: (error) => {
      if (error.message === "DUPLICATE_NAME") {
        form.setError("name", {
          message: "Workflow name already exists. Choose a different name.",
        });
        toast.error("Workflow name already exists", { id: "create-workflow" });
      } else {
        toast.error("Failed to create workflow", { id: "create-workflow" });
      }
    },
  });

  const onSubmit = useCallback(
    (data: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(data);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={(open) => {
        form.reset();
        setOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600">{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitle="Start building your workflow"
        />

        <div className="p-6">
          <form
            id="create-workflow-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              {/* Name Field */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="workflow-name">
                      Name{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        (required)
                      </span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="workflow-name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Choose a descriptive and unique name
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />

              {/* Description Field */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="workflow-description">
                      Description{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="workflow-description"
                        rows={4}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>
                        Provide a brief description of what your workflow does.
                        This is optional but can help you remember the
                        workflow&apos;s purpose
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          {/* Proceed Button */}
          <Button
            type="submit"
            form="create-workflow-form"
            className="mt-6 w-full"
            disabled={isPending || !form.formState.isValid}
            variant={"emerald"}
          >
            {!isPending && "Proceed"}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
