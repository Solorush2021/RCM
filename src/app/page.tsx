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

// More dramatic current data for effect
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
    // Running data fetches in parallel for much faster load times.
    const [agentsResult, anomaliesResult] = await Promise.allSettled([
      monitorAiAgents(),
      analyzeAnomalies({ 
        metricsData: JSON.stringify(currentMetricsData),
        pastMetricsData: JSON.stringify(pastMetricsData),
      })
    ]);

    if (agentsResult.status === 'fulfilled') {
      agents = agentsResult.value;
    } else {
      console.error("Failed to load AI agent statuses:", agentsResult.reason);
      error = "Failed to load AI agent statuses.";
    }

    if (anomaliesResult.status === 'fulfilled') {
      anomalies = anomaliesResult.value;
    } else {
      console.error("Failed to analyze anomalies:", anomaliesResult.reason);
      const anomaliesError = "Failed to analyze anomalies.";
      error = error ? `${error} ${anomaliesError}` : anomaliesError;
    }
    
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
