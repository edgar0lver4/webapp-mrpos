"use client";
import Image from "next/image";
import { version } from "../../../package.json";
import { MenuButton } from "./buttons";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();
  const menu = [
    {
      href: "/",
      label: "Inicio",
      isActive: pathname === "/",
    },
    {
      href: "/orders",
      label: "Ordenes",
      isActive: pathname === "/orders",
    },
    {
      href: "/categories",
      label: "Menú",
      isActive: pathname === "/categories",
    },
    {
      href: "/users",
      label: "Usuarios",
      isActive: pathname === "/users",
    },
  ];
  return (
    <div className="flex flex-col gap-2 rounded-r-lg px-4 bg-primary-o min-w-0 lg:min-w-[240px]">
      <div className="flex flex-col justify-center items-center border-b-4 border-white w-full py-4">
        <Image src="/assets/logo-1-1.png" width={72} height={72} alt="logo" />
        <p className="mt-4 text-white description-body-semibold">
          Version:{version}
        </p>
      </div>
      <div className="flex flex-col">
        {menu.map((itm) => (
          <MenuButton
            key={`key-${itm.href}`}
            href={itm.href}
            isActive={itm.isActive}
          >
            {itm.label}
          </MenuButton>
        ))}
      </div>
    </div>
  );
};
