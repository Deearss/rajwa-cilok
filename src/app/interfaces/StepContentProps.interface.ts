import type { TutorialStep } from "@/app/hooks/useTutorialStore";

export interface StepContentProps {
  currentStep: TutorialStep;
  currentStepIndex: number;
  defaultClasses: string; // Ditambahkan kembali
  nextStep: () => void;
  prevStep: () => void;
  hideTutorial: () => void;
  skipPermanently: () => void;
  isLastStep: boolean;
  showConfirm?: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: {
      confirmButtonText?: string;
      cancelButtonText?: string;
      confirmButtonColor?: string;
    }
  ) => void;
}
