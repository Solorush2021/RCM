'use server';

/**
 * @fileOverview Provides real-time status updates for AI agents assisting in RCM processes.
 *
 * - monitorAiAgents - A function that returns the status of AI agents.
 * - MonitorAiAgentsOutput - The return type for the monitorAiAgents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MonitorAiAgentsOutputSchema = z.object({
  agents: z.array(
    z.object({
      name: z.string().describe('The name of the AI agent.'),
      status: z.enum(['active', 'idle', 'error']).describe('The current status of the AI agent.'),
      lastActivity: z.string().describe('Timestamp of the last activity.'),
      details: z.string().optional().describe('Additional details about the agent status.'),
    })
  ).describe('List of AI agents and their statuses.'),
});
export type MonitorAiAgentsOutput = z.infer<typeof MonitorAiAgentsOutputSchema>;

export async function monitorAiAgents(): Promise<MonitorAiAgentsOutput> {
  return monitorAiAgentsFlow();
}

const monitorAiAgentsFlow = ai.defineFlow({
    name: 'monitorAiAgentsFlow',
    inputSchema: z.void(),
    outputSchema: MonitorAiAgentsOutputSchema,
  },
  async () => {
    // This function now returns mock data directly instead of making a slow, unnecessary AI call.
    // This significantly improves performance.
    const mockAgentStatuses: MonitorAiAgentsOutput = {
      agents: [
        {
          name: 'Eligibility Agent',
          status: 'active' as const,
          lastActivity: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
          details: 'Processing eligibility checks efficiently.',
        },
        {
          name: 'Denial Management Agent',
          status: 'idle' as const,
          lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          details: 'Awaiting new denial cases.',
        },
        {
          name: 'Payment Posting Agent',
          status: 'active' as const,
          lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          details: 'Automatically posting payments.',
        },
        {
          name: 'Claim Submission Agent',
          status: 'error' as const,
          lastActivity: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          details: 'Experiencing issues with claim submissions.',
        },
      ]
    };
    return mockAgentStatuses;
  }
);
