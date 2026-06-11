"use client";

import { CoinsIcon } from "lucide-react";

function TaskCreditsBadge({ credits }: { credits: number }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold text-white">
      <CoinsIcon size={12} strokeWidth={2.25} />
      <span>{credits}</span>
    </div>
  );
}

export default TaskCreditsBadge;
