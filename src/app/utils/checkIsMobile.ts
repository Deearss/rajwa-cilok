import { headers } from "next/headers";

// Fungsi untuk mengecek apakah perangkat pengguna adalah mobile
export async function checkIsMobile(): Promise<boolean> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  return /Mobi|Android/i.test(userAgent);
}
