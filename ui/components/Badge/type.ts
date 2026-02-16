import { ReactNode } from "react";

enum TYPE_BADGE {
  DEFAULT = "default",
  GOLDEN = "golden",
}

export type Props = {
  children: ReactNode;
  variant: `${TYPE_BADGE}`;
  className?: string;
};
