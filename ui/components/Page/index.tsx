import Head from "next/head";
import { Props } from "./type";

export const PageContainer = ({ children, titleText }: Props) => {
  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <div className="mt-4 mx-4">{children}</div>
    </>
  );
};
