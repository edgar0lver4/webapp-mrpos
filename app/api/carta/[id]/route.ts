import { CategoryUseCase } from "@application/Letters/CategoryUseCase";
import { LettersUseCase } from "@application/Letters/LettersUseCase";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { Letter } from "@core/Letters/domain";
import { ProfileSession } from "@core/Profile/domain";
import { delay } from "@libs/delay";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  try {
    const security = new SecurityUseCases();
    const token = req.cookies.get("token")?.value;
    if (token) {
      const { businessId } = security.decriptJWT<ProfileSession>(token);
      const category = new CategoryUseCase(businessId);
      await category.deleteCategory(id);
      await delay(3000);
      return new Response(null, { status: 204 });
    }
    const res = NextResponse.json(
      {
        message: "Token invalido",
      },
      {
        status: 401,
      }
    );

    return res;
  } catch (e) {
    console.warn("Error:", e);
    const res = NextResponse.json(
      {
        message: "Error interno",
      },
      {
        status: 500,
      }
    );

    return res;
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  try {
    const security = new SecurityUseCases();
    const token = req.cookies.get("token")?.value;
    if (token) {
      security.decriptJWT<ProfileSession>(token);
      const letterController = new LettersUseCase(id);
      const list = await letterController.getAll();
      return NextResponse.json(
        {
          data: list,
        },
        { status: 200 }
      );
    }
    const res = NextResponse.json(
      {
        message: "Token invalido",
      },
      {
        status: 401,
      }
    );

    return res;
  } catch (e) {
    console.warn("Error:", e);
    const res = NextResponse.json(
      {
        message: "Error interno",
      },
      {
        status: 500,
      }
    );

    return res;
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id: categoryId } = await params;
  const body = await req.json();
  try {
    const security = new SecurityUseCases();
    const token = req.cookies.get("token")?.value;
    if (token) {
      security.decriptJWT<ProfileSession>(token);
      const letterId = security.generateRandomId();
      const letterController = new LettersUseCase(categoryId);
      const payload: Letter = {
        categoryId,
        isVariable: body.isVariable === 0 ? false : true,
        letterId,
        name: body.name,
        price: body.price,
      };
      await letterController.createLetter(payload);
      const res = NextResponse.json(
        {
          message: "Error interno",
        },
        {
          status: 200,
        }
      );
      return res;
    }
    const res = NextResponse.json(
      {
        message: "Sin autorizacón",
      },
      {
        status: 401,
      }
    );

    return res;
  } catch (e) {
    console.warn("Error:", e);
    const res = NextResponse.json(
      {
        message: "Error interno",
      },
      {
        status: 500,
      }
    );

    return res;
  }
};
