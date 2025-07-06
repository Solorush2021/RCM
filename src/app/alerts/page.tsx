import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { AlertsView } from '@/components/alerts/alerts-view';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AlertsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <AlertsView />
      </SidebarInset>
    </SidebarProvider>
  );
}
