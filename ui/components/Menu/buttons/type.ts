import { ReactNode } from "react";

export type Props = {
  children: ReactNode | ReactNode[];
  href: string;
  isActive?: boolean;
};
