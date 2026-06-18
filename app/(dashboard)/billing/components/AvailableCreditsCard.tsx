import { Coins } from "lucide-react";

interface AvailableCreditsCardProps {
  credits: number;
}

export default function AvailableCreditsCard({
  credits,
}: AvailableCreditsCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-linear-to-br from-green-50 to-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">Available Credits</p>
          <p className="text-4xl font-bold text-green-500">{credits.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-3">
            When your credit balance reaches zero, your workflows will stop
            working
          </p>
        </div>
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <Coins className="w-8 h-8 text-green-600" />
        </div>
      </div>
    </div>
  );
}
