import { CategoryUseCase } from "@application/Letters/CategoryUseCase";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { ProfileSession } from "@core/Profile/domain";
import ListCategory from "@ui/components/List";
import { PageContainer } from "@ui/components/Page";
import { cookies } from "next/headers";

const CategoryPage = async () => {
  const cookes = await cookies();
  const token = cookes.get("token")?.value;
  if (token) {
    const security = new SecurityUseCases();
    const { businessId } = security.decriptJWT<ProfileSession>(token);
    const categoryController = new CategoryUseCase(businessId);
    const categories = await categoryController.getAllCategories();

    return (
      <PageContainer titleText="MRPOS | Administrador">
        <div>
          <p className="heading-md">Gestion del menú</p>
          <p className="description-body">
            Introduce el menu de tu restaurante, diferencialo por categorías
          </p>
        </div>
        <ListCategory categories={categories} />
      </PageContainer>
    );
  }

  return <div>Error</div>;
};

export default CategoryPage;
