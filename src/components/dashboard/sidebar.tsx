'use client';
import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from './icons';
import {
  LayoutDashboard,
  FileText,
  Users,
  Bell,
  Settings,
  HelpCircle,
  PanelLeft,
} from 'lucide-react';
import { Button } from '../ui/button';

export function DashboardSidebar() {
  const { toggleSidebar, state } = useSidebar();
  return (
    <Sidebar className="border-r border-border/20">
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary animate-float" />
          <h1 className="text-xl font-semibold text-glow text-primary">
            RCM Genie
          </h1>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <PanelLeft />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip={{children:"Dashboard"}}>
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{children:"Reports"}}>
              <FileText />
              Reports
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{children:"Patients"}}>
              <Users />
              Patients
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{children:"Alerts"}}>
              <Bell />
              Alerts
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{children:"Settings"}}>
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{children:"Help"}}>
              <HelpCircle />
              Help & Support
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
