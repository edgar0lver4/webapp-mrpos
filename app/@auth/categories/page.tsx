import { PageContainer } from "@ui/components/Page";
import { cookies } from "next/headers";
import { CategoryContainer } from "./CategoryContainer";

const CategoryPage = async () => {
  const cookes = await cookies();
  const token = cookes.get("token")?.value;
  if (token) {
    return (
      <PageContainer titleText="MRPOS | Administrador">
        <div>
          <p className="heading-md">Gestion del menú</p>
          <p className="description-body">
            Introduce el menu de tu restaurante, diferencialo por categorías
          </p>
        </div>
        <CategoryContainer />
      </PageContainer>
    );
  }

  return <div>Error</div>;
};

export default CategoryPage;
