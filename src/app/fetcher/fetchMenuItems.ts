import { MenuItemInterface } from "../interfaces/MenuItem.interface";

/**
 *
 *
 * Mengambil data menu dari API dan secara opsional menjalankan callback dengan data yang diambil.
 *
 * @param callback - Fungsi opsional yang akan dijalankan dengan data yang diambil.
 * @returns Sebuah promise yang menghasilkan array objek `MenuItemInterface`.
 * @throws Akan melempar error jika permintaan fetch gagal atau respons tidak OK.
 */
export const fetchMenuItems = async (
  callback?: (data: Array<MenuItemInterface>) => void
): Promise<Array<MenuItemInterface>> => {
  try {
    // Melakukan permintaan fetch ke endpoint API untuk mendapatkan data menu
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`);

    // Memeriksa apakah respons dari server memiliki status OK
    if (!response.ok) {
      // Jika tidak OK, lemparkan error dengan pesan yang sesuai
      throw new Error("Failed to fetch menu items");
    }

    // Mengurai data JSON dari respons
    const data = await response.json();

    // Jika callback diberikan, jalankan callback dengan data yang diambil
    if (callback) {
      callback(data.data);
    }

    // Mengembalikan data menu yang diambil
    return data.data;
  } catch (error: Error | any) {
    // Menangkap dan mencetak error ke konsol untuk debugging
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};
