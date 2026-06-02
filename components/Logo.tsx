import Link from "next/link";
import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";

function Logo({
  fontSize = "2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn("flex text-2xl font-extrabold items-center gap-2", fontSize)}
    >
      <div className="rounded-xl bg-linear-to-r from-emerald-500 to to-emerald-600 p-2">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-linear-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          Scrape
        </span>
        <span className = "text-stone-700 dark:text-stone-300">
          Flow
        </span>
      </div>
    </Link>
  );
}

export default Logo;
