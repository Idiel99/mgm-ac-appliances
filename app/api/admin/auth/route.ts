import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.QUOTE_PASSWORD;

  if (!correctPassword) {
    return Response.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  if (password !== correctPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("mgm_admin_token", correctPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return Response.json({ success: true });
}
