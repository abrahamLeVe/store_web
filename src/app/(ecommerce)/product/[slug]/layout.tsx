import HeaderMain from "@/components/nav-bar/header-main";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center min-h-screen font-[family-name:var(--font-nunito-sans)]">
      <HeaderMain />
      <main className="flex flex-col gap-5 max-w-screen-2xl items-center w-full p-1 md:p-2">
        {children}
      </main>
    </div>
  );
}