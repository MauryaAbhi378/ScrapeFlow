import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps } from "lucide-react";

export function createTaskIcon(Icon: LucideIcon, className: string) {
  return function TaskIcon(props: LucideProps) {
    return <Icon {...props} className={cn(className, props.className)} />;
  };
}
