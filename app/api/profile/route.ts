import { ProfileUseCase } from "@application/Profile/ProfileUseCases";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { headers } = req;
    const token = headers.get("authorization");
    const split = token?.split(" ");
    const jwt = split?.[1];
    console.log(jwt);
    if (jwt) {
      const profileUseCase = new ProfileUseCase();
      await profileUseCase.terminateRegister(jwt);

      return NextResponse.json(
        {
          message: "Configuración de carta finalizada",
        },
        {
          status: 200,
        }
      );
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
