import { CategoryUseCase } from "@application/Letters/CategoryUseCase";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { CategoryRequest } from "@core/Letters/domain";
import { ProfileSession } from "@core/Profile/domain";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body: CategoryRequest = await req.json();
    const security = new SecurityUseCases();
    const token = req.cookies.get("token")?.value;
    if (!body?.name) {
      const res = NextResponse.json(
        {
          message: "En nombre es necesario",
        },
        {
          status: 400,
        }
      );
      return res;
    }
    if (token) {
      const { businessId } = security.decriptJWT<ProfileSession>(token);
      const category = new CategoryUseCase(businessId);
      await category.createCategory(body.name);
      const res = NextResponse.json(
        {
          message: "Categoría creada",
        },
        {
          status: 201,
        }
      );

      return res;
    } else {
      const res = NextResponse.json(
        {
          message: "Token invalido",
        },
        {
          status: 401,
        }
      );

      return res;
    }
  } catch (e) {
    const res = NextResponse.json(
      {
        message: "Error Interno",
      },
      {
        status: 500,
      }
    );

    return res;
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const security = new SecurityUseCases();
    const token = req.cookies.get("token")?.value;
    if (token) {
      const { businessId } = security.decriptJWT<ProfileSession>(token);
      const category = new CategoryUseCase(businessId);
      const allCategories = await category.getAllCategories();
      const res = NextResponse.json(
        {
          data: allCategories,
        },
        {
          status: 200,
        }
      );

      return res;
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
    console.warn("Error in get all categories:", e);
    const res = NextResponse.json(
      {
        message: "Error Interno",
      },
      {
        status: 500,
      }
    );

    return res;
  }
};
