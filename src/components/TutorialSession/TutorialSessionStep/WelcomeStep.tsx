// c:\Project-Ngoding\rajwa-cilok\src\components\TutorialSession\TutorialSessionStep\WelcomeStep.tsx
import React from "react"; // Removed useState
import type { StepContentProps } from "@/app/interfaces/StepContentProps.interface";
import { formatMessage } from "@/app/utils/formatMessage";
import useIsMobile from "@/app/hooks/useIsMobile";

const WelcomeStep: React.FC<StepContentProps> = ({
  currentStep,
  // currentStepIndex, // Tidak lagi dibutuhkan secara langsung di sini karena tombol Kembali selalu ada
  defaultClasses,
  nextStep,
  // prevStep, // Tidak lagi dibutuhkan secara langsung di sini
  skipPermanently,
  showConfirm,
  hideTutorial,
}) => {
  // Removed useState for clickedButton
  // Removed handleButtonClick function

  const { isMobile } = useIsMobile();

  const handleSkipPermanently = () => {
    if (showConfirm) {
      showConfirm(
        "Apakah Anda yakin tidak ingin melihat tutorial ini lagi? Anda dapat menampilkannya kembali dari menu **Jam Buka Warung**.",
        () => {
          skipPermanently();
        },
        () => {
          console.log("Batal melewati tutorial secara permanen.");
        },
        {
          confirmButtonText: "Ya, Nonaktifkan",
          cancelButtonText: "Batal",
          confirmButtonColor: "bg-gray-500 active:bg-gray-600",
        }
      );
    }
  };

  return (
    <div
      className={`${defaultClasses} flex flex-col items-center ${
        !isMobile ? "!top-[12.5%]" : "!top-[18%]"
      } text-[0.9rem] animate-squish`}
    >
      <h2 className="text-[1.2em] font-bold text-gray-800 mb-1">
        <>
          <i className="fa-solid fa-star"></i>
          <span className="mx-2.5 leading-none">{currentStep.title}</span>
          <i className="fa-solid fa-star"></i>
        </>
      </h2>
      <div className="text-[0.9em] text-gray-600 text-left w-full font-semibold mb-2">
        {formatMessage(currentStep.text)}
      </div>
      {/* Button Container */}
      <div className="flex flex-col items-center w-full space-y-2.5 font-bold text-[1em] !select-none">
        {/* Top row for Kembali and Lanjut/Selesai */}
        <div className="flex justify-center space-x-2 w-full mb-4 text-[1em]">
          {/* Tombol Kembali selalu ada, tapi disabled di WelcomeStep */}
          <button
            id="prevButtonWelcome"
            onClick={() => {}} // Fungsi kosong
            disabled // Tombol dinonaktifkan
            className="px-3 py-1.5 rounded-md flex items-center justify-center transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400 clicked transall text-[0.8em] disabled:opacity-50 disabled:cursor-not-allowed flex-1" // Ubah warna background dan text, pertahankan style disabled, Tambah flex-1
          >
            <i className="fas fa-arrow-left mr-1.5" /> Kembali
          </button>
          <button
            id="nextButtonWelcome"
            onClick={nextStep} // Directly call nextStep
            className="px-3 py-1.5 rounded-md flex items-center justify-center transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400 clicked transall text-[0.8em] flex-1" // Tambah flex-1
          >
            Lanjut <i className="fa-regular fa-circle-right ml-1.5" />
          </button>
        </div>

        {/* Middle row for Skip Tutorial */}
        <div className="flex justify-center w-full">
          <button
            id="skipSessionButtonWelcome"
            onClick={hideTutorial} // Directly call hideTutorial
            className="px-3 py-1.5 rounded-md flex items-center justify-center transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 clicked transall text-[0.8em]" // Added clicked transall, removed conditional, Added text-[0.9em]
          >
            <i className="fas fa-forward mr-1.5" /> Skip Tutorial
          </button>
        </div>

        {/* Bottom row for Nonaktifkan Tutorial */}
        <div className="flex justify-center w-full">
          <button
            id="skipButtonWelcome"
            onClick={handleSkipPermanently} // Directly call handleSkipPermanently
            className="px-3 py-1.5 rounded-md flex items-center justify-center transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 clicked transall text-[0.8em]" // Added clicked transall, removed conditional, Added text-[0.9em]
          >
            <i className="fas fa-times-circle mr-1.5" /> Nonaktifkan Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
