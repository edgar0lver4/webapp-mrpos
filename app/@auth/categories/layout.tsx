import { CategoryProvider } from "@ui/contexts/Categroy";

const LayoutCategory = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};

export default LayoutCategory;
