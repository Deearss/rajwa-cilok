import { CartItemInterface } from "@/app/hooks/useCartStore";
import { showConfirm } from "@/app/hooks/useConfirmStore";
import { showPrompt } from "@/app/hooks/usePromptStore"; // Import showPrompt
import { showAlert } from "@/app/hooks/useAlertStore";
import { requestWhatsAppRedirect } from "../hooks/useWhatsAppPermissionStore"; // Import requestWhatsAppRedirect

export const sendOrderToWhatsApp = (
  items: Array<CartItemInterface>,
  totalCartPrice: number,
  clearCart: () => void
) => {
  const performOrderSequence = (currentAddress: string = "") => {
    showPrompt(
      "Masukkan **alamat pengiriman**, boleh menggunakan text saja atau link Google Maps yang mengarah ke lokasi anda **(Opsional)** :",
      (addressFromPrompt) => {
        // addressFromPrompt is the value from the prompt (could be empty if user confirmed an empty optional prompt)

        let confirmationMessage: string;
        // Use the address directly from the prompt for this confirmation step.
        // currentAddress is used to pre-fill the prompt in the next iteration if needed.
        const finalAddress = addressFromPrompt;

        if (finalAddress && finalAddress.trim() !== "") {
          confirmationMessage = `Anda akan mengirimkan pesanan ini ke **WhatsApp Admin** dengan alamat pengiriman: "**${finalAddress}**". Apakah Anda yakin?`;
        } else {
          confirmationMessage =
            "Anda akan mengirimkan pesanan ini ke **WhatsApp Admin** tanpa alamat pengiriman. Apakah Anda yakin?";
        }

        showConfirm(
          confirmationMessage,
          () => {
            // onConfirm for showConfirm: User wants to send the order
            const phoneNumber = process.env.NEXT_PUBLIC_MERCHANT_PHONE;
            if (!phoneNumber) {
              console.error("Merchant phone number is not defined.");
              showAlert(
                "Nomor telepon penjual tidak tersedia. Pesanan tidak dapat dilanjutkan."
              );
              return;
            }

            const orderDetails = items
              .map((item, index) => {
                const name = item.name.padEnd(20, " ");
                const price = `Rp${item.price.toLocaleString()}`;
                const quantity = item.quantity;
                const subtotal = `Rp${(
                  item.price * item.quantity
                ).toLocaleString()}`;

                return (
                  `${index + 1}. ${name}\n\n` +
                  `   ID Item        : ${item.id}\n` +
                  `   Harga          : ${price}\n` +
                  `   Jumlah Pesanan : (${quantity})\n` +
                  `   Subtotal       : ${subtotal} \n\n\n`
                );
              })
              .join("\n");

            const message = encodeURIComponent(
              [
                "```",
                "🧾 Struk Pemesanan",
                "==============================",
                "",
                orderDetails,
                "",
                "-----------------------------------",
                `Total Biaya Pemesanan : Rp${totalCartPrice.toLocaleString()}`,
                `-----------------------------------${
                  finalAddress && finalAddress.trim() !== ""
                    ? `\n\nAlamat Pengiriman :\n${finalAddress}\n\n`
                    : ``
                }`,
                "",
                "",
                "Terima kasih 🙏",
                "```",
              ].join("\n")
            );

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

            requestWhatsAppRedirect(whatsappUrl, () => {
              showAlert(
                "Anda sedang dialihkan ke WhatsApp Admin. **Pastikan Anda mengirim pesan yang sudah disiapkan** agar pesanan Anda dapat kami proses. Terima kasih!"
              );
              clearCart();
            });
          },
          () => {
            // onCancel for showConfirm: User cancelled the final confirmation.
            // Re-prompt for address, passing the address they just saw (finalAddress)
            // as the default for the next prompt.
            performOrderSequence(finalAddress);
          },
          {
            confirmButtonText: "Pesan Sekarang",
            cancelButtonText: "Kembali",
            confirmButtonColor: "green",
          }
        );
      },
      currentAddress, // Default value for the prompt
      () => {
        // onCancel for showPrompt (optional): User cancelled entering address.
        // showAlert("Pemesanan dibatalkan."); // Or simply do nothing.
      }
    );
  };

  performOrderSequence(); // Start the process with no initial address.
};
