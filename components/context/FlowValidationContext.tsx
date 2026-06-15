import { AppNodeMissingInputs } from "@/types/appNode";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type FlowValidationContextType = {
  inValidInputs: AppNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

export function FlowValidationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [inValidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>(
    [],
  );

  const clearErrors = () => {
    setInvalidInputs([]);
  };
  return (
    <FlowValidationContext.Provider
      value={{ inValidInputs, setInvalidInputs, clearErrors }}
    >
      {children}
    </FlowValidationContext.Provider>
  );
}
