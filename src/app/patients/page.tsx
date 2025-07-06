import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { PatientsView } from '@/components/patients/patients-view';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function PatientsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <PatientsView />
      </SidebarInset>
    </SidebarProvider>
  );
}
