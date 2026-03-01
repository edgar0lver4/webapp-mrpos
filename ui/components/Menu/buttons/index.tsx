import Link from "next/link";
import { Props } from "./type";

export const MenuButton = ({ children, href, isActive }: Props) => {
  const style = isActive
    ? "bg-primary-o-shine description-body-semibold text-white"
    : "bg-primary-o description-body";
  return (
    <Link
      href={href}
      className={`durantion-300 transition p-4 rounded-lg ${style}`}
    >
      {children}
    </Link>
  );
};
