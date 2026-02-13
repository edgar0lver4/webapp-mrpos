"use client";
import Image from "next/image";

type Params = { token: string; name: string };
export const GeneratorProfileComp = ({ token, name }: Params) => {
  return (
    <div className="flex flex-col items-center">
      <Image src={"/assets/logo-1-1.png"} width={230} height={230} alt="logo" />
      <p className="description-body text-white mt-4">
        Configurando tu perfil {name}
      </p>
    </div>
  );
};
