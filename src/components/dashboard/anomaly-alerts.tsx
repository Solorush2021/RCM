import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { AnalyzeAnomaliesOutput } from '@/ai/flows/analyze-anomalies';
import { AlertTriangle, Info, ShieldAlert, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const severityMap = {
  high: { icon: <ShieldAlert className="h-4 w-4" />, variant: 'destructive' as const },
  medium: { icon: <AlertTriangle className="h-4 w-4" />, className: 'border-yellow-400/50 text-yellow-400 [&>svg]:text-yellow-400', variant: 'default' as const },
  low: { icon: <Info className="h-4 w-4" />, className: 'border-blue-400/50 text-blue-400 [&>svg]:text-blue-400', variant: 'default' as const },
};

export function AnomalyAlerts({ anomalies }: { anomalies: AnalyzeAnomaliesOutput['anomalies'] }) {
  return (
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
                            <div className="flex items-center">
                                {config.icon}
                                <div className='ml-4'>
                                    <AlertTitle>{anomaly.metric}</AlertTitle>
                                    <AlertDescription>{anomaly.issue}</AlertDescription>
                                </div>
                            </div>
                           <TooltipProvider>
                              <Tooltip>
                                  <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                                          <Eye className="h-4 w-4" />
                                      </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                      <p>Investigate Anomaly</p>
                                  </TooltipContent>
                              </Tooltip>
                           </TooltipProvider>
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
  );
}