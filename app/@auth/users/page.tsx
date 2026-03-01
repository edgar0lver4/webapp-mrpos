import { PageContainer } from "@ui/components/Page";

const UsersPage = () => {
  return (
    <PageContainer titleText="MRPOS | Usuarios">
      <div>
        <p className="heading-md">Gestión de usuarios</p>
        <p className="description-body">
          Añade, edita o elimina a tus usuarios
        </p>
      </div>
    </PageContainer>
  );
};

export default UsersPage;
