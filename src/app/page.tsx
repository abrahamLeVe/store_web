import { ModeToggle } from "@/components/mode-toggle";
import { NavMenu } from "@/components/nav-bar/nav-menu";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="w-full bg-red-500">
        <nav className="flex flex-row items-center justify-center h-20 max-w-screen-2xl m-auto gap-1">
          <NavMenu />
          <ModeToggle />
        </nav>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
