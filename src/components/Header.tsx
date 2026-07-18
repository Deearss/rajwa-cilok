"use client";

import React, { useEffect, useRef, useState } from "react"; // Added useEffect
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/app/hooks/useCartStore";
import useCartOpenStore from "@/app/hooks/useCartOpenStore";
import Cart from "./Cart";
import useTutorialStore from "@/app/hooks/useTutorialStore";
import useIsMobile from "@/app/hooks/useIsMobile"; // Import useIsMobile

// Define props interface for Header
interface HeaderProps {
  initialIsMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ initialIsMobile }) => {
  // Update to use HeaderProps
  const { isCartOpen, setCartOpen } = useCartOpenStore();
  const { items } = useCartStore();
  const { isTutorialVisible, tutorialSteps, currentStepIndex } =
    useTutorialStore();
  const { setIsMobile } = useIsMobile(); // Get setIsMobile from useIsMobile

  // Effect to set initial mobile status from prop
  useEffect(() => {
    setIsMobile(initialIsMobile);
  }, [initialIsMobile, setIsMobile]);

  const [duplicateButtonProps, setDuplicateButtonProps] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const originalButtonRef = useRef<HTMLButtonElement>(null);

  // Effect for main header style and duplicate button visibility/position
  useEffect(() => {
    const currentTutorialStep = tutorialSteps[currentStepIndex];
    const isCartHighlightStep =
      isTutorialVisible &&
      currentTutorialStep?.highlightedElementId ===
        "tutorial-highlight-header-menu-button";

    if (isCartHighlightStep) {
      const originalButton = document.getElementById(
        "tutorial-highlight-header-menu-button"
      );
      if (originalButton) {
        // Store ref for scroll/resize listener to avoid repeated getElementById
        originalButtonRef.current = originalButton as HTMLButtonElement;
        const rect = originalButton.getBoundingClientRect();
        setDuplicateButtonProps({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          visible: true,
        });
      }
    } else {
      setDuplicateButtonProps((prev) => ({ ...prev, visible: false }));
      originalButtonRef.current = null; // Clear ref
    }
  }, [isTutorialVisible, tutorialSteps, currentStepIndex]);

  // Effect for updating duplicate button position on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (originalButtonRef.current && duplicateButtonProps.visible) {
        const rect = originalButtonRef.current.getBoundingClientRect();
        setDuplicateButtonProps({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          visible: true,
        });
      }
    };

    if (duplicateButtonProps.visible) {
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      updatePosition(); // Initial call to position correctly
    }

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [duplicateButtonProps.visible]); // Only depends on visibility to add/remove listeners

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    setCartOpen(!isCartOpen);
  };

  return (
    <>
      <div
        // Reverted to static z-index and background for the main header
        className={`fixed -top-0.5 left-0 w-full shadow-md px-3 z-[99] bg-white`}
      >
        <nav className="container mx-auto p-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/thecilok.PNG"
                alt="Logo"
                className="size-[50px]"
                width={346}
                height={346}
              />
              <span className="font-bold text-base flexcc gap-1.5 !items-start">
                <span className="leading-4">Rajwa</span>
                <span className="leading-4">Cilok</span>
              </span>
            </div>
          </Link>
          <ul className="flex items-center space-x-4">
            {/* Original li and button - its ID is used for positioning */}
            <li className="bg-white rounded-lg overflow-hidden border border-gray-200 relative clicked transall text-gray-700 active:text-black">
              <button
                id="tutorial-highlight-header-menu-button" // Keep ID for getElementById
                type="button"
                className={`h-[50px] w-[60px] flexc font-semibold p-3 relative`}
                onClick={handleButtonClick}
              >
                <span className="flexc font-semibold text-lg">
                  <span className="leading-none h-[15px] flexc">
                    <i
                      className={`fas fa-shopping-basket text-[1.2em] ${
                        items.length > 0 ? "animate-bounceku" : ""
                      }`}
                    />
                  </span>
                </span>
                {items.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-blue-500 rounded-lg px-3 flexc text-white text-[10px] font-bold animate-pulseku">
                    {items.reduce((total, item) => total + item.quantity, 0)}
                    <span className="absolute h-[80%] w-[80%] rounded-lg px-1.5 bg-blue-500 opacity-50 animate-pingku"></span>
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
        {isCartOpen && <Cart />}
      </div>

      {/* Duplicate Button for Tutorial Highlight */}
      {duplicateButtonProps.visible && (
        <div
          style={{
            position: "fixed",
            top: `${duplicateButtonProps.top}px`,
            left: `${duplicateButtonProps.left}px`,
            width: `${duplicateButtonProps.width}px`,
            height: `${duplicateButtonProps.height}px`,
          }}
          className="z-[1000] bg-white rounded-lg overflow-hidden border border-gray-200 shadow-xl" // Added shadow for better highlight
        >
          <div className="h-full w-full flexc font-semibold p-3 relative">
            <span className="flexc font-semibold text-lg">
              <span className="leading-none h-[15px] flexc">
                <i
                  className={`fas fa-shopping-basket text-[1.2em] animate-bounceku`}
                />
              </span>
            </span>
            {items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-blue-500 rounded-lg px-3 flexc text-white text-[10px] font-bold">
                {items.reduce((total, item) => total + item.quantity, 0)}
                {/* No ping/pulse on duplicate to keep it static unless desired */}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
