import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface TutorialStep {
  elementId?: string;
  title?: string; // Added title
  text: string;
  name?: string; // Ditambahkan untuk memperjelas fungsi step
  // arrowPosition?: "top" | "bottom" | "left" | "right"; // Old version - REMOVED
  // arrow?: { // New more detailed arrow object - REMOVED
  //   direction: "top" | "bottom" | "left" | "right" | "none";
  //   targetId?: string; // ID of element the arrow points to (optional)
  //   customStyles?: React.CSSProperties; // For fine-tuning
  // };
  highlightedElementId?: string; // ID of the element to highlight for this step
  // textBoxStyles?: React.CSSProperties; // Old: For custom positioning and styling of the text box
}

interface TutorialState {
  isTutorialVisible: boolean;
  isTutorialSkippedPermanently: boolean;
  currentStepIndex: number;
  tutorialSteps: TutorialStep[];
  showTutorial: () => void;
  hideTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void; // Ditambahkan prevStep
  skipPermanently: () => void;
  setTutorialSteps: (steps: TutorialStep[]) => void;
  resetTutorial: () => void; // To allow re-triggering tutorial for testing or if new features are added
  checkInitialTutorialStatus: () => void; // Added here
  restartTutorial: () => void; // Added restartTutorial action
}

const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      isTutorialVisible: false,
      isTutorialSkippedPermanently: false,
      currentStepIndex: 0,
      tutorialSteps: [], // Default empty, will be set by the component using the tutorial

      showTutorial: () => {
        if (!get().isTutorialSkippedPermanently) {
          set({ isTutorialVisible: true, currentStepIndex: 0 });
        }
      },
      hideTutorial: () => set({ isTutorialVisible: false }),
      nextStep: () => {
        const { currentStepIndex, tutorialSteps, hideTutorial } = get();
        if (currentStepIndex < tutorialSteps.length - 1) {
          set({ currentStepIndex: currentStepIndex + 1 });
        } else {
          hideTutorial(); // Hide tutorial after the last step
        }
      },
      // Ditambahkan implementasi prevStep
      prevStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1 });
        }
      },
      skipPermanently: () => {
        set({ isTutorialVisible: false, isTutorialSkippedPermanently: true });
      },
      setTutorialSteps: (steps) => set({ tutorialSteps: steps }),
      resetTutorial: () => {
        // This allows manually resetting the tutorial, even if skipped permanently.
        // Useful for development or if a user wants to see it again.
        // For a full reset including permanent skip, localStorage item needs to be cleared separately if needed.
        set({
          isTutorialVisible: true,
          currentStepIndex: 0,
          // isTutorialSkippedPermanently: false, // Optionally reset this too
        });
      },
      // Moved checkInitialTutorialStatus here
      checkInitialTutorialStatus: () => {
        const { isTutorialSkippedPermanently, showTutorial, tutorialSteps } = get();
        if (!isTutorialSkippedPermanently && tutorialSteps.length > 0) {
          // Only show tutorial if not skipped and steps are defined
          showTutorial();
        }
      },
      // Moved restartTutorial here for correct 'set' and 'get' scope
      restartTutorial: () => {
        localStorage.removeItem('tutorial-storage'); // Remove the persisted state to clear permanent skip
        set({
          // isTutorialVisible: true, // REMOVED: Do not show before reload
          currentStepIndex: 0,
          isTutorialSkippedPermanently: false, // Explicitly set to false
        });
        // Reload the page to ensure a fresh start and scroll to top
        window.location.reload();
        // After reload, InitializeTutorialLogic will call checkInitialTutorialStatus,
        // which will then call showTutorial if conditions are met.
      },
    }),
    {
      name: 'tutorial-storage', // Name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        isTutorialSkippedPermanently: state.isTutorialSkippedPermanently,
        // We don't persist isTutorialVisible or currentStepIndex,
        // so it always starts fresh unless skipped permanently.
      }),
      // Action to restart the tutorial from the beginning - MOVED INSIDE (set, get)
      // restartTutorial: () => {
      //   localStorage.removeItem('tutorial-storage');
      //   set({
      //     isTutorialVisible: true,
      //     currentStepIndex: 0,
      //     isTutorialSkippedPermanently: false, 
      //   });
      //   get().checkInitialTutorialStatus(); 
      // },
    }
  )
);

export default useTutorialStore;
