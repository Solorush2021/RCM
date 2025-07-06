import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { MetricDetailView } from '@/components/metrics/metric-detail-view';
import { kpiDetails } from '@/lib/mock-data';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { notFound } from 'next/navigation';

type Props = {
  params: { kpi: string };
};

export default function MetricDetailPage({ params }: Props) {
  const kpiSlug = params.kpi;
  const kpiData = kpiDetails[kpiSlug as keyof typeof kpiDetails];

  if (!kpiData) {
    notFound();
  }
  
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <MetricDetailView kpi={kpiData} />
      </SidebarInset>
    </SidebarProvider>
  );
}
