import React from "react";

// Mendefinisikan struktur untuk segmen teks beserta gayanya
export interface Segment {
  text: string;
  isBold?: boolean;
  isItalic?: boolean; // Untuk format miring di masa mendatang
}

/**
 * Mem-parsing string pesan awal menjadi satu segmen.
 * @param message String pesan mentah.
 * @returns Array yang berisi satu segmen.
 */
export const parseInitialSegments = (message: string): Segment[] => {
  return [{ text: message }];
};

/**
 * Menerapkan format tebal ke segmen berdasarkan delimiter '**'.
 * Mempertahankan gaya lain yang sudah ada pada segmen.
 * @param segments Array dari Segmen.
 * @returns Array baru dari Segmen dengan format tebal diterapkan.
 */
export const applyBoldFormatting = (segments: Segment[]): Segment[] => {
  return segments.flatMap((segment) => {
    // Jika status tebal sudah ditentukan untuk segmen ini, jangan proses ulang untuk tebal.
    if (segment.isBold !== undefined) {
      return [segment];
    }
    const parts = segment.text.split("**");
    return parts
      .map((part, index) => ({
        ...segment, // Pertahankan gaya lain seperti isItalic
        text: part,
        isBold: index % 2 === 1, // Teks di antara '**' menjadi tebal
      }))
      .filter((s) => s.text.length > 0); // Hapus segmen kosong
  });
};

/**
 * Menerapkan format miring ke segmen berdasarkan delimiter '*' (asterisk tunggal).
 * Mempertahankan gaya lain yang sudah ada pada segmen.
 * @param segments Array dari Segmen.
 * @returns Array baru dari Segmen dengan format miring diterapkan.
 */
export const applyItalicFormatting = (segments: Segment[]): Segment[] => {
  return segments.flatMap((segment) => {
    // Jika status miring sudah ditentukan untuk segmen ini, jangan proses ulang untuk miring.
    if (segment.isItalic !== undefined) {
      return [segment];
    }
    // Gunakan regex untuk memisahkan dengan * tetapi hindari **
    // Pola: cocokkan * yang tidak diikuti oleh * dan tidak didahului oleh *
    // Ini lebih rumit dari yang diharapkan karena kita perlu menangani ** vs *
    // Untuk kesederhanaan awal, kita akan memisahkan dengan * tunggal dan mengasumsikan tidak ada tumpang tindih langsung dengan **
    // Jika ada **italic** maka akan jadi <strong><em>italic</em></strong>
    // Jika ada *bold*** maka akan jadi <em>bold</em>*
    // Ini adalah pendekatan yang disederhanakan. Parsing yang lebih kuat mungkin diperlukan untuk kasus yang kompleks.

    const parts = segment.text.split("*");
    return parts
      .map((part, index) => ({
        ...segment, // Pertahankan gaya lain seperti isBold
        text: part,
        isItalic: index % 2 === 1, // Teks di antara '*' menjadi miring
      }))
      .filter((s) => s.text.length > 0); // Hapus segmen kosong
  });
};

/**
 * Merender array segmen yang sudah digayakan menjadi node React.
 * @param segments Array dari Segmen.
 * @returns Array dari React.ReactNode.
 */
export const renderFormattedSegments = (
  segments: Segment[]
): React.ReactNode[] => {
  return segments.flatMap((segment, segmentIndex) => {
    const lines = segment.text.split("\n");
    const lineNodes = lines.flatMap((line, lineIndex) => {
      let content: React.ReactNode = line;
      // Terapkan gaya - urutan mungkin penting untuk penumpukan, mis., miring di dalam tebal
      if (segment.isItalic) {
        content = (
          <em key={`italic-${segmentIndex}-${lineIndex}`}>{content}</em>
        );
      }
      if (segment.isBold) {
        content = (
          <strong key={`bold-${segmentIndex}-${lineIndex}`}>{content}</strong>
        );
      }

      if (lineIndex < lines.length - 1) {
        // Jika ini bukan bagian baris terakhir dari segmen saat ini, tambahkan <br />
        return [content, <br key={`br-${segmentIndex}-${lineIndex}`} />];
      }
      return [content]; // Bagian baris terakhir, atau jika tidak ada \n
    });
    return lineNodes;
  });
};

/**
 * Memformat string pesan dengan menerapkan semua aturan pemformatan
 * (tebal, miring, dll.) dan merendernya menjadi node React.
 * @param message String pesan mentah.
 * @returns Array dari React.ReactNode yang sudah diformat.
 */
export const formatMessage = (message: string): React.ReactNode[] => {
  const initialSegments = parseInitialSegments(message);
  const boldFormatted = applyBoldFormatting(initialSegments);
  const italicFormatted = applyItalicFormatting(boldFormatted); // Placeholder, akan menerapkan miring jika diimplementasikan
  return renderFormattedSegments(italicFormatted);
};
