import { CategoryUseCase } from "@application/Letters/CategoryUseCase";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { ProfileSession } from "@core/Profile/domain";
import { PageContainer } from "@ui/components/Page";
import { cookies } from "next/headers";

const OrdersPage = async () => {
  return (
    <PageContainer titleText="MRPOS | Administrador">
      <div>
        <p className="heading-md">Gestión de ordenes</p>
        <p className="description-body">
          Aqui puedes ver las ordenes creades y crear nuevas ordenes
        </p>
      </div>
    </PageContainer>
  );
};

export default OrdersPage;
