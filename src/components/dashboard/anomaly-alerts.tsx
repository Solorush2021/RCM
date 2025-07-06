'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { AnalyzeAnomaliesOutput } from '@/ai/flows/analyze-anomalies';
import { AlertTriangle, Info, ShieldAlert, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';


const severityMap = {
  high: { icon: <ShieldAlert className="h-4 w-4" />, variant: 'destructive' as const },
  medium: { icon: <AlertTriangle className="h-4 w-4" />, className: 'border-yellow-400/50 text-yellow-400 [&>svg]:text-yellow-400', variant: 'default' as const },
  low: { icon: <Info className="h-4 w-4" />, className: 'border-blue-400/50 text-blue-400 [&>svg]:text-blue-400', variant: 'default' as const },
};

const mockInvestigationData = {
    "A/R Days": Array.from({ length: 6 }, (_, i) => ({ name: `Month ${i+1}`, value: 45 - i * 2 + (Math.random() - 0.5) * 5 })),
    "Denial Rate": Array.from({ length: 6 }, (_, i) => ({ name: `Month ${i+1}`, value: 15 - i * 1.5 + (Math.random() - 0.5) * 3 })),
    "Cost Reduction": Array.from({ length: 6 }, (_, i) => ({ name: `Month ${i+1}`, value: 5 + i * 1.2 + (Math.random() - 0.5) * 2 })),
    "Eligibility Speed": Array.from({ length: 6 }, (_, i) => ({ name: `Month ${i+1}`, value: 48 - i * 8 + (Math.random() - 0.5) * 10 })),
}

export function AnomalyAlerts({ anomalies }: { anomalies: AnalyzeAnomaliesOutput['anomalies'] }) {
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnalyzeAnomaliesOutput['anomalies'][0] | null>(null);

  const handleInvestigate = (anomaly: AnalyzeAnomaliesOutput['anomalies'][0]) => {
      setSelectedAnomaly(anomaly);
  };
  
  const getMetricData = (metricName: string) => {
    // The metric name from anomaly might not match the key in mockInvestigationData exactly
    const dataKey = Object.keys(mockInvestigationData).find(key => key.includes(metricName.split(' ')[0]));
    return dataKey ? mockInvestigationData[dataKey as keyof typeof mockInvestigationData] : [];
  }

  return (
    <Dialog>
      <Card className="glassmorphic h-full">
        <CardHeader>
          <CardTitle>Anomaly Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
              {anomalies && anomalies.length > 0 ? (
                  anomalies.map((anomaly, index) => {
                      const config = severityMap[anomaly.severity];
                      return (
                          <Alert key={index} variant={config.variant} className={(config.variant === 'default' ? config.className : '') + ' flex items-center justify-between'}>
                              <div className="flex items-center overflow-hidden">
                                  {config.icon}
                                  <div className='ml-4'>
                                      <AlertTitle>{anomaly.metric}</AlertTitle>
                                      <AlertDescription className="truncate">{anomaly.issue}</AlertDescription>
                                  </div>
                              </div>
                              <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => handleInvestigate(anomaly)}>
                                      <Eye className="h-4 w-4" />
                                  </Button>
                              </DialogTrigger>
                          </Alert>
                      )
                  })
              ) : (
                  <div className="text-center text-muted-foreground py-4">
                      <Info className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>No anomalies detected. System operating normally.</p>
                  </div>
              )}
          </div>
        </CardContent>
      </Card>

      {selectedAnomaly && (
        <DialogContent className="max-w-2xl bg-background/80 backdrop-blur-lg border-primary/20">
            <DialogHeader>
                <DialogTitle className="text-primary text-glow">Investigating: {selectedAnomaly.metric}</DialogTitle>
                <DialogDescription>
                    AI-driven analysis and historical trend for the detected anomaly.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <h3 className="font-semibold mb-2">AI Summary</h3>
                    <p className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded-md">{selectedAnomaly.issue}</p>
                    <h3 className="font-semibold mt-4 mb-2">Recommended Actions</h3>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Review recent changes in billing codes for this metric.</li>
                        <li>Cross-reference with payment posting dates.</li>
                        <li>Notify department head of the significant variance.</li>
                    </ul>
                </div>
                <div className="h-64">
                    <h3 className="font-semibold mb-2 text-center">Historical Trend (Last 6 Months)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getMetricData(selectedAnomaly.metric)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip 
                                contentStyle={{
                                    background: 'hsl(var(--background) / 0.8)',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }}
                                labelStyle={{ color: 'hsl(var(--foreground))' }}
                                wrapperClassName="!text-sm"
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
