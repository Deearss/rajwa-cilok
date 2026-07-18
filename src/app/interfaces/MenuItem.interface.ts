export interface MenuItemInterface {
  id: string;
  name: string;
  price: number;
  category?: "" | "terlaris" | "terbaru"; // Properti opsional untuk kategori
  image?: string; // Properti opsional untuk gambar
  ongkir?: "" | "free"; // Properti opsional untuk ongkir
  description?: string; // Properti opsional untuk deskripsi
}
