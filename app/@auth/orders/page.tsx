import { PageContainer } from "@ui/components/Page";

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
