import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { fetchMenuItems } from "./fetcher/fetchMenuItems";
import { MenuItemInterface } from "./interfaces/MenuItem.interface";
import StoreHours from "@/components/StoreHours";
import { checkIsMobile } from "./utils/checkIsMobile"; // Import checkIsMobile
import Footer from "@/components/Footer";

export default async function Home() {
  const menuItems: Array<MenuItemInterface> = await fetchMenuItems();
  const isMobile = await checkIsMobile(); // Check if mobile

  return (
    <main className="bg-gray-200">
      <Header initialIsMobile={isMobile} /> {/* Pass isMobile to Header */}
      <Menu menuItems={menuItems} />
      <Footer />
      <StoreHours />
    </main>
  );
}
