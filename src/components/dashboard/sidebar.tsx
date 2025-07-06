'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { SettingsDialog } from '@/components/settings/settings-dialog';
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
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
    { href: '/reports', label: 'Reports', icon: FileText, tooltip: 'View and generate financial reports' },
    { href: '/patients', label: 'Patients', icon: Users, tooltip: 'Manage patient records and demographics' },
    { href: '/alerts', label: 'Alerts', icon: Bell, tooltip: 'Review system alerts and notifications' },
  ];

  return (
    <Dialog>
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
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={{children: item.tooltip}}>
                  <Link href={item.href}>
                    <item.icon />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DialogTrigger asChild>
                <SidebarMenuButton tooltip={{children:"Configure dashboard and agent settings"}}>
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </DialogTrigger>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{children:"Access documentation and support channels"}}>
                <HelpCircle />
                Help & Support
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SettingsDialog />
    </Dialog>
  );
}
