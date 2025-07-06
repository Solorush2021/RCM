import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MonitorAiAgentsOutput } from '@/ai/flows/monitor-ai-agents';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const StatusIndicator = ({ status }: { status: 'active' | 'idle' | 'error' }) => {
  return (
    <TooltipProvider>
      <Tooltip>
          <TooltipTrigger asChild>
              <div className="relative flex items-center justify-center w-4 h-4">
                  <div
                  className={cn(
                      'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
                      {
                      'bg-green-400': status === 'active',
                      'bg-yellow-400': status === 'idle',
                      'bg-red-400': status === 'error',
                      }
                  )}
                  ></div>
                  <div
                  className={cn('relative inline-flex rounded-full h-3 w-3', {
                      'bg-green-500': status === 'active',
                      'bg-yellow-500': status === 'idle',
                      'bg-red-500': status === 'error',
                  })}
                  ></div>
              </div>
          </TooltipTrigger>
          <TooltipContent>
              <p className="capitalize">{status}</p>
          </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function AgentStatusList({ agents }: { agents: MonitorAiAgentsOutput['agents'] }) {
  return (
    <Card className="glassmorphic h-full">
      <CardHeader>
        <CardTitle>AI Agent Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {agents.map((agent) => (
            <li key={agent.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                    <StatusIndicator status={agent.status} />
                    <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.details}</p>
                    </div>
                </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
