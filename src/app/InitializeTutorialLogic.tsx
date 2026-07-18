"use client";

import { useEffect } from "react";
import useTutorialStore, { TutorialStep } from "./hooks/useTutorialStore";

const InitializeTutorialLogic = () => {
  const { setTutorialSteps, checkInitialTutorialStatus } = useTutorialStore();

  useEffect(() => {
    const steps: TutorialStep[] = [
      {
        title: "Selamat Datang!",
        text: "Ini adalah menu utama kami. Kamu bisa lihat berbagai pilihan Cilok yang enak.",
        name: "welcome",
        highlightedElementId: "tutorial-highlight-menu-grid",
      },
      {
        title: "Tombol Buka Keranjang",
        text: "Gunakan tombol ini untuk membuka keranjangmu, tempat semua pesananmu ditampung sebelum di checkout.",
        name: "cart",
        highlightedElementId: "tutorial-highlight-header-menu-button",
      },
      {
        title: "Jam Buka Warung",
        text: "Cek jam operasional warung kami di sini ya! Warung kami buka setiap hari **kecuali hari Senin**.",
        name: "storeHours",
        highlightedElementId: "tutorial-highlight-store-hours-section",
      },
    ];

    setTutorialSteps(steps);
    checkInitialTutorialStatus();
  }, [setTutorialSteps, checkInitialTutorialStatus]);

  return null;
};

export default InitializeTutorialLogic;
