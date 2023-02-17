import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const cookie = req.cookies.get("next3.0");
    // if (!cookie?.value) throw new Error("authentication failed!");

    return NextResponse.next();
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: "authentication failed!",
      }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/recovery"],
};
