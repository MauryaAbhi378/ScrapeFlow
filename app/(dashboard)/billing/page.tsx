import { getCreditsAction } from "@/actions/billing/getCreditsAction";
import { getCreditUsageAction } from "@/actions/billing/getCreditUsageAction";
import AvailableCreditsCard from "./components/AvailableCreditsCard";
import PurchaseCreditsCard from "./components/PurchaseCreditsCard";
import CreditsConsumedChart from "./components/CreditsConsumedChart";
import BillingNotifications from "./components/BillingNotifications";

export default async function BillingPage() {
  const [credits, usageData] = await Promise.all([
    getCreditsAction(),
    getCreditUsageAction(),
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Billing</h1>

      <BillingNotifications />

      <AvailableCreditsCard credits={credits} />

      <PurchaseCreditsCard />

      <CreditsConsumedChart usageData={usageData} />
    </div>
  );
}
