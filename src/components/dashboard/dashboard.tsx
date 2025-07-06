'use client';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from './sidebar';
import { KpiCard } from './kpi-card';
import { MainChart } from './main-chart';
import { AgentStatusList } from './agent-status-list';
import { AnomalyAlerts } from './anomaly-alerts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, DollarSign, FileCheck, Zap, TrendingUp } from 'lucide-react';
import type { MonitorAiAgentsOutput } from '@/ai/flows/monitor-ai-agents';
import type { AnalyzeAnomaliesOutput } from '@/ai/flows/analyze-anomalies';
import { useEffect, useState } from 'react';
import { SystemStatus } from './system-status';

type DashboardProps = {
    agents: MonitorAiAgentsOutput['agents'];
    anomalies: AnalyzeAnomaliesOutput['anomalies'];
    kpiData: {
        current: { arDays: number; denialRate: number; costReduction: number; eligibilitySpeed: number; };
        past: { arDays: number; denialRate: number; costReduction: number; eligibilitySpeed: number; };
    },
    error: string | null;
}

export function Dashboard({ agents, anomalies, kpiData, error }: DashboardProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [kpiChartData, setKpiChartData] = useState<{ value: number }[]>([]);

    useEffect(() => {
        setIsMounted(true);
        // Generate more varied data for KPI charts
        const generateData = () => Array.from({ length: 12 }, () => ({ value: Math.random() * 80 + 20 }));
        setKpiChartData(generateData());
    }, []);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Alert variant="destructive" className="max-w-md glassmorphic">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Loading Dashboard</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }
    
    const {current, past} = kpiData;
    
    const arDaysChange = past.arDays !== 0 ? ((current.arDays - past.arDays) / past.arDays) * 100 : 0;
    const denialRateChange = past.denialRate !== 0 ? ((current.denialRate - past.denialRate) / past.denialRate) * 100 : 0;
    const costReductionChange = past.costReduction !== 0 ? ((current.costReduction - past.costReduction) / past.costReduction) * 100 : 0;
    const eligibilitySpeedChange = past.eligibilitySpeed !== 0 ? ((current.eligibilitySpeed - past.eligibilitySpeed) / past.eligibilitySpeed) * 100 : 0;

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset className="overflow-auto">
                <div className={`p-4 sm:p-6 lg:p-8 space-y-6 transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                    <header className="animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                        <h1 className="text-3xl font-bold text-glow">RCM Command Center</h1>
                        <p className="text-muted-foreground text-flicker">Live analysis of revenue cycle operations</p>
                    </header>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        <div className="xl:col-span-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                                <KpiCard title="A/R Days" value={current.arDays} change={arDaysChange} sentiment={arDaysChange < 0 ? 'good' : 'bad'} icon={<DollarSign />} data={kpiChartData} color="hsl(var(--chart-1))" suffix=" days" />
                            </div>
                            <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                                <KpiCard title="Denial Rate" value={current.denialRate} change={denialRateChange} sentiment={denialRateChange < 0 ? 'good' : 'bad'} icon={<FileCheck />} data={kpiChartData} color="hsl(var(--chart-2))" suffix="%" />
                            </div>
                            <div className="animate-slide-in-up" style={{ animationDelay: '400ms' }}>
                                <KpiCard title="Cost Reduction" value={current.costReduction} change={costReductionChange} sentiment={costReductionChange > 0 ? 'good' : 'bad'} icon={<TrendingUp />} data={kpiChartData} color="hsl(var(--chart-3))" suffix="%" />
                            </div>
                            <div className="animate-slide-in-up" style={{ animationDelay: '500ms' }}>
                                <KpiCard title="Eligibility Speed" value={current.eligibilitySpeed} change={eligibilitySpeedChange} sentiment={eligibilitySpeedChange < 0 ? 'good' : 'bad'} icon={<Zap />} data={kpiChartData} color="hsl(var(--chart-4))" suffix=" hrs" />
                            </div>
                        </div>

                        <div className="xl:col-span-3 animate-slide-in-up" style={{ animationDelay: '600ms' }}>
                            <MainChart />
                        </div>
                        <div className="xl:col-span-2 animate-slide-in-up" style={{ animationDelay: '700ms' }}>
                            <AgentStatusList agents={agents} />
                        </div>

                        <div className="xl:col-span-2 animate-slide-in-up" style={{ animationDelay: '800ms' }}>
                            <SystemStatus />
                        </div>
                        <div className="xl:col-span-3 animate-slide-in-up" style={{ animationDelay: '900ms' }}>
                            <AnomalyAlerts anomalies={anomalies} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}