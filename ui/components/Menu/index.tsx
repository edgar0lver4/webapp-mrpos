import Image from "next/image";
import { version } from "../../../package.json";

export const Menu = () => {
  return (
    <div className="flex flex-col gap-2 rounded-r-lg px-4 bg-primary-o min-w-0 lg:min-w-[240px]">
      <div className="flex flex-col justify-center items-center border-b-4 border-white w-full py-4">
        <Image src="/assets/logo-1-1.png" width={72} height={72} alt="logo" />
        <p className="mt-4 text-white description-body-semibold">
          Version:{version}
        </p>
      </div>
      <div></div>
    </div>
  );
};
