import { getWorkflowExecutionStatsAction } from "@/actions/home/getWorkflowExecutionStatsAction";
import { getDailyCreditsSpentAction } from "@/actions/home/getDailyCreditsSpentAction";
import StatsCard from "./_components/StatsCard";
import WorkflowExecutionStatusChart from "./_components/WorkflowExecutionStatusChart";
import DailyCreditsSpentChart from "./_components/DailyCreditsSpentChart";
import { format } from "date-fns";

async function HomePage() {
  const [stats, dailyCredits] = await Promise.all([
    getWorkflowExecutionStatsAction(),
    getDailyCreditsSpentAction(),
  ]);

  const currentMonth = format(new Date(), "MMMM yyyy");

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Home</h1>
          <div className="text-sm text-gray-600">{currentMonth}</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Workflow executions"
            value={stats.totalExecutions}
          />
          <StatsCard
            title="Phase executions"
            value={stats.totalPhaseExecutions}
          />
          <StatsCard
            title="Credits consumed"
            value={stats.totalCreditsConsumed}
          />
        </div>

        {/* Workflow Execution Status Chart */}
        <WorkflowExecutionStatusChart data={stats.dailyStats} />

        {/* Daily Credits Spent Chart */}
        <DailyCreditsSpentChart data={dailyCredits} />
      </div>
    </div>
  );
}

export default HomePage;