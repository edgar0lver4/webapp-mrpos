import { useMemo } from "react";
import { Props } from "./type";

export const Badge = ({ children, variant, className }: Props) => {
  const background = useMemo(() => {
    if (variant === "default") {
      return "bg-default";
    }
  }, [variant]);
  return (
    <label
      className={`description-body-sm text-white p-1 rounded-lg ${background} ${className}`}
    >
      {children}
    </label>
  );
};
