import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import WhatsAppPermissionPopup from "../components/WhatsAppPermissionPopup"; // Impor WhatsAppPermissionPopup
import InitializeClientLogic from "./InitializeClientLogic"; // Impor InitializeClientLogic (untuk WhatsApp)
import InitializeTutorialLogic from "./InitializeTutorialLogic"; // Impor InitializeTutorialLogic (untuk Tutorial)
import MyAlert from "@/components/MyAlert";
import MyConfirm from "@/components/MyConfirm";
import MyPrompt from "@/components/MyPrompt";
import TutorialSession from "@/components/TutorialSession"; // Import TutorialSession

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rajwa Cilok - Jajanan Kekinian",
  description:
    "Nikmati cilok dan aneka jajanan lainnya yang enak, murah, dan bikin nagih! Jajan online di Rajwa Cilok, praktis dan kekinian!",
  keywords: ["cilok", "jajanan", "makanan ringan", "next.js", "react"],
  authors: [{ name: "Rajwa Cilok" }],
  openGraph: {
    title: "Rajwa Cilok - Jajanan Kekinian",
    description:
      "Nikmati cilok dan aneka jajanan lainnya yang enak, murah, dan bikin nagih! Jajan online di Rajwa Cilok, praktis dan kekinian!",
    type: "website",
  },
  icons: {
    icon: "/images/rajwa-cilok-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${quicksand.className}`}>
        <MyAlert />
        <MyConfirm />
        <MyPrompt />
        <WhatsAppPermissionPopup />
        <InitializeClientLogic /> {/* Untuk WhatsApp */}
        <InitializeTutorialLogic /> {/* Untuk Tutorial */}
        {children}
        <TutorialSession /> {/* Add TutorialSession here */}
      </body>
    </html>
  );
}
