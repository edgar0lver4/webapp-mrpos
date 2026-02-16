import { ProfileUseCase } from "@application/Profile/ProfileUseCases";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { headers } = req;
    const token = headers.get("authorization");
    const split = token?.split(" ");
    const jwt = split?.[1];
    if (jwt) {
      const profileUseCase = new ProfileUseCase();
      const sessionToken = await profileUseCase.terminateRegister(jwt);

      const res = NextResponse.json(
        {
          message: "Configuración de carta finalizada",
        },
        {
          status: 200,
        }
      );

      res.cookies.set("token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return res;
    }
    return NextResponse.json(
      {
        error: true,
        message: "Token invalido",
      },
      {
        status: 400,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: true,
        message: "Token invalido",
      },
      {
        status: 400,
      }
    );
  }
};
