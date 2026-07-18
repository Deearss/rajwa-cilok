"use client";

import { useEffect } from "react";
import { initializeWhatsAppLogic } from "./hooks/useWhatsAppPermissionStore";

const InitializeClientLogic: React.FC = () => {
  useEffect(() => {
    initializeWhatsAppLogic();
  }, []);

  return null; // This component does not render anything
};

export default InitializeClientLogic;
