import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { ReportsView } from '@/components/reports/reports-view';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <ReportsView />
      </SidebarInset>
    </SidebarProvider>
  );
}
