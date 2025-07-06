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

const prompt = ai.definePrompt({
  name: 'monitorAiAgentsPrompt',
  output: {schema: MonitorAiAgentsOutputSchema},
  prompt: `You are an AI agent monitoring system that tracks the status of other AI agents. Return a JSON object with the status of each agent. The current time is {{now}}.\n\nEnsure the output conforms to the following schema:\n\n${JSON.stringify(MonitorAiAgentsOutputSchema)}`,
});

const monitorAiAgentsFlow = ai.defineFlow({
    name: 'monitorAiAgentsFlow',
    inputSchema: z.void(),
    outputSchema: MonitorAiAgentsOutputSchema,
  },
  async () => {
    // Mock data for AI agent statuses.
    const mockAgentStatuses = [
      {
        name: 'Eligibility Agent',
        status: 'active' as const,
        lastActivity: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
        details: 'Processing eligibility checks efficiently.',
      },
      {
        name: 'Denial Management Agent',
        status: 'idle' as const,
        lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        details: 'Awaiting new denial cases.',
      },
      {
        name: 'Payment Posting Agent',
        status: 'active' as const,
        lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        details: 'Automatically posting payments.',
      },
      {
        name: 'Claim Submission Agent',
        status: 'error' as const,
        lastActivity: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 60 minutes ago
        details: 'Experiencing issues with claim submissions.',
      },
    ];

    const now = new Date().toISOString();

    const {output} = await prompt({
      now,
    });

    // In a real application, you would fetch the actual agent statuses from a database or monitoring system.
    // The prompt helps to ensure the statuses conform to the schema.
    output!.agents = mockAgentStatuses;
    return output!;
  }
);
