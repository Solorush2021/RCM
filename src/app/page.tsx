import { monitorAiAgents } from '@/ai/flows/monitor-ai-agents';
import { analyzeAnomalies } from '@/ai/flows/analyze-anomalies';
import { Dashboard } from '@/components/dashboard/dashboard';
import type { MonitorAiAgentsOutput } from '@/ai/flows/monitor-ai-agents';
import type { AnalyzeAnomaliesOutput } from '@/ai/flows/analyze-anomalies';

const pastMetricsData = {
  arDays: 45,
  denialRate: 15,
  costReduction: 5,
  eligibilitySpeed: 48, // hours
};

const currentMetricsData = {
  arDays: 38,
  denialRate: 8,
  costReduction: 12,
  eligibilitySpeed: 4, // hours
};

export default async function DashboardPage() {
  let agents: MonitorAiAgentsOutput | null = null;
  let anomalies: AnalyzeAnomaliesOutput | null = null;
  let error = null;

  try {
    // We run promises in sequence to avoid overloading any backend services if they share resources.
    agents = await monitorAiAgents();
    anomalies = await analyzeAnomalies({ 
      metricsData: JSON.stringify(currentMetricsData),
      pastMetricsData: JSON.stringify(pastMetricsData),
    });
  } catch (e) {
    console.error(e);
    error = "Failed to load dashboard data. The AI services may be offline."
  }

  return (
    <Dashboard 
      agents={agents?.agents ?? []}
      anomalies={anomalies?.anomalies ?? []}
      kpiData={{current: currentMetricsData, past: pastMetricsData}}
      error={error}
    />
  );
}
