import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { User } from "@core/User/domain";
import Image from "next/image";
import { GeneratorProfileComp } from "./generatorView";

const FinishRegisterPage = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = await params;
  const security = new SecurityUseCases();
  const decriptData: User = security.decriptJWT(token);

  return (
    <div className="flex flex-col min-w-[100vw] min-h-[100vh] items-center justify-center bg-gradient-to-b from-black from-0% via-black via-80% to-[#616161] to-100%">
      <GeneratorProfileComp token={token} name={decriptData.name} />
    </div>
  );
};

export default FinishRegisterPage;
