'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mockAlerts } from '@/lib/mock-data';
import { AlertTriangle, CheckCircle, ShieldAlert, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const severityMap = {
  high: { icon: ShieldAlert, color: 'text-red-400', badge: 'destructive' as const },
  medium: { icon: AlertTriangle, color: 'text-yellow-400', badge: 'secondary' as const },
  low: { icon: Zap, color: 'text-blue-400', badge: 'default' as const },
};

const resolvedMap = {
  resolved: { icon: CheckCircle, color: 'text-green-400' }
}

export function AlertsView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-glow">System Alerts</h1>
        <p className="text-muted-foreground">Monitor and manage system-wide alerts and operational events.</p>
      </header>
      <Card className="glassmorphic">
        <CardContent className="p-4 sm:p-6">
          <Tabs defaultValue="ongoing">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ongoing">Ongoing Problems</TabsTrigger>
              <TabsTrigger value="potential">Potential Problems</TabsTrigger>
              <TabsTrigger value="resolved">Resolved (Past 7 Days)</TabsTrigger>
            </TabsList>
            <TabsContent value="ongoing" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {mockAlerts.ongoing.map((alert) => {
                  const SeverityIcon = severityMap[alert.severity].icon;
                  return (
                    <AccordionItem value={alert.id} key={alert.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-4">
                          <SeverityIcon className={cn('h-5 w-5', severityMap[alert.severity].color)} />
                          <span className="font-medium">{alert.title}</span>
                          <Badge variant={severityMap[alert.severity].badge} className="capitalize">{alert.severity}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground pl-9">{alert.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
            <TabsContent value="potential" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {mockAlerts.potential.map((alert) => {
                   const SeverityIcon = severityMap[alert.severity].icon;
                  return (
                    <AccordionItem value={alert.id} key={alert.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-4">
                          <SeverityIcon className={cn('h-5 w-5', severityMap[alert.severity].color)} />
                          <span className="font-medium">{alert.title}</span>
                          <Badge variant={severityMap[alert.severity].badge} className="capitalize">{alert.severity}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground pl-9">{alert.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
            <TabsContent value="resolved" className="mt-4">
               <Accordion type="single" collapsible className="w-full">
                {mockAlerts.resolved.map((alert) => {
                   const ResolvedIcon = resolvedMap.resolved.icon;
                  return (
                    <AccordionItem value={alert.id} key={alert.id}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-4">
                            <ResolvedIcon className={cn('h-5 w-5', resolvedMap.resolved.color)} />
                            <span className="font-medium">{alert.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground mr-4">
                            Resolved {formatDistanceToNow(new Date(alert.resolvedAt), { addSuffix: true })}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground pl-9">{alert.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
