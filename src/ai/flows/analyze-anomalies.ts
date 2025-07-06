// This is an AI-powered code! Do not edit, except under strict compliance with usage instructions!
'use server';
/**
 * @fileOverview An anomaly detection AI agent.
 *
 * - analyzeAnomalies - A function that handles the anomaly detection process.
 * - AnalyzeAnomaliesInput - The input type for the analyzeAnomalies function.
 * - AnalyzeAnomaliesOutput - The return type for the analyzeAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAnomaliesInputSchema = z.object({
  metricsData: z.string().describe('A JSON string containing the key operational metrics data, including AR days, denial rate, cost reduction, and eligibility speed.'),
  pastMetricsData: z.string().describe('A JSON string containing historical key operational metrics data for comparison.'),
});
export type AnalyzeAnomaliesInput = z.infer<typeof AnalyzeAnomaliesInputSchema>;

const AnalyzeAnomaliesOutputSchema = z.object({
  anomalies: z.array(
    z.object({
      metric: z.string().describe('The name of the metric with the anomaly.'),
      issue: z.string().describe('The description of the anomaly or potential issue.'),
      severity: z.enum(['high', 'medium', 'low']).describe('The severity of the anomaly.'),
    })
  ).describe('An array of detected anomalies in the key operational metrics data.'),
});
export type AnalyzeAnomaliesOutput = z.infer<typeof AnalyzeAnomaliesOutputSchema>;

export async function analyzeAnomalies(input: AnalyzeAnomaliesInput): Promise<AnalyzeAnomaliesOutput> {
  return analyzeAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeAnomaliesPrompt',
  input: {schema: AnalyzeAnomaliesInputSchema},
  output: {schema: AnalyzeAnomaliesOutputSchema},
  prompt: `You are an expert in Revenue Cycle Management (RCM) and a skilled data analyst. Your task is to analyze the provided key operational metrics data and identify any anomalies or potential issues. Compare the current metrics with the past metrics data to detect significant deviations.

Your analysis should focus on identifying anomalies in AR days, denial rate, cost reduction, and eligibility speed. For each detected anomaly, provide a clear description of the issue and assess its severity (high, medium, or low).

Output the anomalies in a JSON format, including the metric name, a description of the issue, and the severity level.

Here is the current metrics data:
{{{metricsData}}}

Here is the past metrics data for comparison:
{{{pastMetricsData}}}

Ensure that the anomalies array is populated only when actual anomalies are detected.
`,
});

const analyzeAnomaliesFlow = ai.defineFlow(
  {
    name: 'analyzeAnomaliesFlow',
    inputSchema: AnalyzeAnomaliesInputSchema,
    outputSchema: AnalyzeAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
