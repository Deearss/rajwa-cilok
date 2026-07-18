// import { menuItems } from "@/app/data/menuItems";
import { NextResponse } from "next/server";

/**
 * Sebuah objek yang berisi header HTTP untuk mengaktifkan Cross-Origin Resource Sharing (CORS).
 * - `Access-Control-Allow-Origin`: Mengizinkan permintaan dari semua origin (`*`).
 * - `Access-Control-Allow-Methods`: Menentukan metode HTTP yang diizinkan (`GET, OPTIONS`).
 * - `Access-Control-Allow-Headers`: Menentukan header HTTP yang diizinkan (`Content-Type`).
 */
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type",
// };

// export async function OPTIONS() {
//   return NextResponse.json(null, { headers: corsHeaders });
// }

export async function GET() {
  try {
    const data = ["DATA SUDAH DIPINDAHKAN!"];

    if (!data) {
      return NextResponse.json(
        {
          status: false,
          statusCode: 404,
          message: "Data not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        statusCode: 200,
        message: "Success",
        data,
      },
      {
        status: 200,
        // headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
