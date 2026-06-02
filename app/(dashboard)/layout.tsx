import { UserButton } from "@clerk/nextjs";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import Sidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ThemeToggleMode";
import { Separator } from "@/components/ui/separator";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-12.5 container">
          <BreadCrumbHeader />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserButton />
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 pl-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
