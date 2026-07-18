"use client";

import React, { useEffect, useRef } from "react";
import useTutorialStore from "@/app/hooks/useTutorialStore";
import useConfirmStore from "@/app/hooks/useConfirmStore";
import WelcomeStep from "./TutorialSessionStep/WelcomeStep";
import CartStep from "./TutorialSessionStep/CartStep";
import StoreHoursStep from "./TutorialSessionStep/StoreHoursStep";
import type { StepContentProps } from "@/app/interfaces/StepContentProps.interface";
import useIsMobile from "@/app/hooks/useIsMobile"; // Import useIsMobile

const TutorialSession: React.FC = () => {
  const {
    isTutorialVisible: isVisible,
    currentStepIndex,
    nextStep,
    prevStep,
    hideTutorial,
    tutorialSteps,
    skipPermanently,
  } = useTutorialStore();
  const { showConfirm } = useConfirmStore();
  const { isMobile } = useIsMobile(); // Get isMobile state

  const currentStep = tutorialSteps[currentStepIndex];

  const textBoxRef = useRef<HTMLDivElement>(null);
  const activelyHighlightedElementRef = useRef<HTMLElement | null>(null);
  // Ref to store original styles of the highlighted element
  const originalStylesRef = useRef<{
    position?: string;
    zIndex?: string;
    transition?: string;
    pointerEvents?: string; // Added to store original pointer-events
  }>({});

  useEffect(() => {
    // Cleanup previous highlight before applying a new one or when tutorial hides
    if (activelyHighlightedElementRef.current) {
      const el = activelyHighlightedElementRef.current;
      el.classList.remove("tutorial-highlight");

      // Restore original styles
      if (originalStylesRef.current.position) {
        // Only remove 'position' if we changed it from 'static' to 'relative'
        if (
          originalStylesRef.current.position === "static" &&
          el.style.position === "relative"
        ) {
          el.style.removeProperty("position");
        }
        // If original was fixed, absolute, or already relative, we didn't change its position property.
      }

      // Restore original zIndex
      if (originalStylesRef.current.zIndex) {
        el.style.zIndex = originalStylesRef.current.zIndex;
      } else {
        el.style.removeProperty("z-index");
      }

      // Restore original transition
      if (
        originalStylesRef.current.transition &&
        originalStylesRef.current.transition !== "none"
      ) {
        el.style.transition = originalStylesRef.current.transition;
      } else {
        // If original transition was 'none' or not set, ensure it's removed if we added 'transition: none'
        el.style.removeProperty("transition");
      }

      // Restore original pointer-events
      if (originalStylesRef.current.pointerEvents) {
        el.style.pointerEvents = originalStylesRef.current.pointerEvents;
      } else {
        el.style.removeProperty("pointer-events");
      }

      activelyHighlightedElementRef.current = null;
      originalStylesRef.current = {}; // Clear stored styles
    }

    if (isVisible) {
      document.body.style.overflow = "hidden";
      if (isMobile) {
        // Only change height if on mobile
        document.body.style.height = "92vh";
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "100vh";
      return; // Exit early if not visible
    }

    if (!currentStep) {
      return () => {
        // Cleanup specific to this condition
        document.body.style.overflow = "";
        document.body.style.height = "100vh";
      };
    }

    if (currentStep.highlightedElementId) {
      const elementToHighlight = document.getElementById(
        currentStep.highlightedElementId
      );
      if (elementToHighlight) {
        elementToHighlight.classList.add("tutorial-highlight");

        // Save original styles before overriding
        const computedStyle = getComputedStyle(elementToHighlight);
        originalStylesRef.current = {
          position: computedStyle.position,
          zIndex: computedStyle.zIndex,
          transition: computedStyle.transition, // Save original transition
          pointerEvents: computedStyle.pointerEvents, // Save original pointer-events
        };

        const originalPosition = originalStylesRef.current.position;

        // Only set position to relative if it's currently static
        if (originalPosition === "static") {
          elementToHighlight.style.position = "relative";
        }
        // Always set z-index to ensure it's above the overlay
        elementToHighlight.style.zIndex = "999";

        // Temporarily disable transitions on the highlighted element
        elementToHighlight.style.transition = "none";

        // Disable pointer events on the highlighted element
        elementToHighlight.style.pointerEvents = "none";

        activelyHighlightedElementRef.current = elementToHighlight;
      }
    }

    return () => {
      // Cleanup for activelyHighlightedElementRef is handled at the top of this effect.
      // This main cleanup ensures body.style.overflow is reset if the component unmounts
      // or if dependencies change leading to a cleanup before an early exit.
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
      if (isMobile && document.body.style.height === "92vh") {
        // Ensure height is reset if it was changed for mobile
        document.body.style.height = "100vh";
      }
    };
  }, [isVisible, currentStep, tutorialSteps, isMobile]); // Added isMobile to dependencies

  const handleOverlayClick = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      nextStep();
    } else {
      hideTutorial();
    }
  };

  const defaultTextBoxClasses =
    "transcenter bg-white p-4 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md text-center z-[1000]";

  const commonBoxProps = {
    ref: textBoxRef,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
  };

  const renderStepContent = () => {
    if (!currentStep || !currentStep.name) return null;

    const propsToPass: StepContentProps = {
      currentStep,
      currentStepIndex,
      defaultClasses: defaultTextBoxClasses, // Ditambahkan kembali untuk diteruskan ke step
      nextStep,
      prevStep,
      hideTutorial,
      skipPermanently,
      isLastStep: currentStepIndex >= tutorialSteps.length - 1,
      // showConfirm akan ditambahkan secara kondisional di bawah
    };

    switch (currentStep.name) {
      case "welcome":
        return <WelcomeStep {...propsToPass} showConfirm={showConfirm} />;
      case "cart":
        return <CartStep {...propsToPass} showConfirm={showConfirm} />;
      case "storeHours":
        // StoreHoursStep tidak memerlukan showConfirm, jadi kita tidak menambahkannya
        return <StoreHoursStep {...propsToPass} />;
      default:
        console.warn("Unknown tutorial step name:", currentStep.name);
        return null;
    }
  };

  if (!isVisible || !currentStep) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[998] cursor-pointer"
        // onClick={handleOverlayClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOverlayClick()}
      >
        {/* Overlay content, if any, or just for click handling */}
      </div>

      {/* Tutorial message box */}
      <div
        {...commonBoxProps}
        // className={defaultTextBoxClasses} // Dihapus dari sini
      >
        {renderStepContent()}
      </div>
    </>
  );
};

export default TutorialSession;
