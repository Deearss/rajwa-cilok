import { create } from "zustand";

interface PromptState {
  isOpen: boolean;
  message: string;
  defaultValue?: string;
  onConfirm: ((value: string) => void) | null;
  onCancel: (() => void) | null;
  openPrompt: (
    message: string,
    onConfirm: (value: string) => void,
    defaultValue?: string,
    onCancel?: () => void
  ) => void;
  closePrompt: () => void;
}

const usePromptStore = create<PromptState>((set) => ({
  isOpen: false,
  message: "",
  defaultValue: "",
  onConfirm: null,
  onCancel: null,
  openPrompt: (message, onConfirm, defaultValue, onCancel) =>
    set({
      isOpen: true,
      message,
      onConfirm,
      defaultValue: defaultValue || "",
      onCancel: onCancel || null,
    }),
  closePrompt: () =>
    set({
      isOpen: false,
      message: "",
      onConfirm: null,
      defaultValue: "",
      onCancel: null,
    }),
}));

export const showPrompt = (
  message: string,
  onConfirm: (value: string) => void,
  defaultValue?: string,
  onCancel?: () => void
) => {
  usePromptStore
    .getState()
    .openPrompt(message, onConfirm, defaultValue, onCancel);
};

export default usePromptStore;
