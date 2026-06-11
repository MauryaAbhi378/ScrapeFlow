import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ThemeToggleMode";
import { Separator } from "@/components/ui/separator";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="min-h-0 flex-1">{children}</div>
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ModeToggle />
      </footer>
    </div>
  );
}

export default layout;
