import { ReactNode } from "react";

export type Props = {
  title: string;
  subtitile?: string;
  children: ReactNode | ReactNode[];
};
