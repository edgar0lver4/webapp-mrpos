import LoginForm from "@ui/forms/LoginForm";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";

export const metadata: Metadata = {
  title: "MRPOS | Iniciar sesión",
  description:
    "Inicia sesión para poder ver el estado de tu o tus restaurantes, ventas, propinas y más.",
};

const HomePagePublic = () => {
  return (
    <>
      <Head>
        <title>MRPOS | Iniciar sesión</title>
      </Head>
      <div className="flex flex-row min-h-[100vh] min-w-[100vw]">
        <div className="w-1/2 bg-primary-o flex flex-col items-center justify-center p-4">
          <Image src="/assets/logo-1-1.png" width={72} height={72} alt="logo" />
          <p className="text-white heading-md">
            Gestión de tu restaurante, de forma rapida y segura
          </p>
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default HomePagePublic;
