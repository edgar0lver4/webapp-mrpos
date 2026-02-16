import { ProfileUseCase } from "@application/Profile/ProfileUseCases";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE() {
  const res = NextResponse.json({
    ok: true,
  });

  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return res;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const IS_MOVILE = body?.grant === "movile";
  if (!body.email || !body.password) {
    const res = NextResponse.json(
      {
        error: true,
        messages: "Parametros inválidos",
      },
      {
        status: 400,
      }
    );
    return res;
  }

  const profileController = new ProfileUseCase();
  const token = await profileController.sessionStart(body.email, body.password);

  const res = NextResponse.json(
    {
      ok: true,
      token: IS_MOVILE ? token : undefined,
    },
    {
      status: 200,
    }
  );

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
