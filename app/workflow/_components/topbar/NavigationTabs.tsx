"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function NavigationTabs({ workflowId }: { workflowId: string }) {
  const pathname = usePathname();
  const isEditorActive = pathname?.includes("/editor/");
  const isRunsActive = pathname?.includes("/runs/");

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="inline-flex items-center bg-[#f0f0f0] rounded-full p-1 gap-1">
        <Link
          href={`/workflow/editor/${workflowId}`}
          className={`
            px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            ${
              isEditorActive
                ? "bg-white shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }
          `}
        >
          Editor
        </Link>
        <Link
          href={`/workflow/runs/${workflowId}`}
          className={`
            px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            ${
              isRunsActive
                ? "bg-white shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }
          `}
        >
          Runs
        </Link>
      </div>
    </div>
  );
}
