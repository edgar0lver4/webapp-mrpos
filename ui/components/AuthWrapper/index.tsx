import { Menu } from "../Menu";
import Navbar from "../navbar";
import { Props } from "./type";

export const AuthWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-row min-h-[100vh] min-w-[100vw]">
      <Menu />
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};
