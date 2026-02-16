import { PageContainer } from "@ui/components/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MRPOS | Administrador",
  description: "Administrador de mrpos",
};

const HomePageAuth = () => {
  return (
    <PageContainer titleText="MRPOS | Administrador">
      Pagina autorizada
    </PageContainer>
  );
};

export default HomePageAuth;
