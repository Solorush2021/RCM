import { DollarSign, FileCheck, TrendingUp, Zap } from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';

// Helper function to generate random chart data
const generateChartData = (points: number, min: number, max: number) => 
  Array.from({ length: points }, (_, i) => ({
    name: format(subMonths(new Date(), points - 1 - i), 'MMM'),
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));

export type SubMetric = {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
  chartData: { value: number }[];
};

export type KpiDetail = {
  title: string;
  slug: string;
  description: string;
  icon: React.ElementType;
  unit: string;
  chartType: 'bar' | 'line';
  mainChartData: { name: string; value: number }[];
  subMetrics: SubMetric[];
};

export const kpiDetails: { [key: string]: KpiDetail } = {
    'a-r-days': {
      title: 'A/R Days',
      slug: 'a-r-days',
      description: 'Average number of days it takes for a provider to receive payment for services.',
      icon: DollarSign,
      unit: ' days',
      chartType: 'line',
      mainChartData: generateChartData(12, 35, 50),
      subMetrics: [
        { title: 'Commercial Payer A/R', value: '32 days', description: 'vs 35 days last period', icon: 'TrendingDown', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 30, 40) },
        { title: 'Government Payer A/R', value: '58 days', description: 'vs 55 days last period', icon: 'TrendingUp', color: 'hsl(var(--chart-4))', chartData: generateChartData(12, 50, 60) },
        { title: 'Self-Pay A/R', value: '75 days', description: 'Stable performance', icon: 'Hourglass', color: 'hsl(var(--chart-2))', chartData: generateChartData(12, 70, 80) },
        { title: 'A/R > 90 Days', value: '18%', description: 'Target: < 15%', icon: 'Target', color: 'hsl(var(--chart-5))', chartData: generateChartData(12, 15, 25) },
        { title: 'Collection Rate', value: '92%', description: 'Slight increase over last period', icon: 'Percent', color: 'hsl(var(--chart-1))', chartData: generateChartData(12, 88, 95) },
        { title: 'Bad Debt Write-offs', value: '$12.5k', description: 'Down from $15k last month', icon: 'TrendingDown', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 10, 20) },
      ],
    },
    'denial-rate': {
        title: 'Denial Rate',
        slug: 'denial-rate',
        description: 'The percentage of claims denied by payers out of the total claims submitted.',
        icon: FileCheck,
        unit: '%',
        chartType: 'bar',
        mainChartData: generateChartData(12, 5, 15),
        subMetrics: [
            { title: 'Top Denial Reason', value: 'Coding Error', description: '35% of all denials', icon: 'TrendingUp', color: 'hsl(var(--chart-4))', chartData: generateChartData(12, 30, 40) },
            { title: 'Appeals Success Rate', value: '65%', description: 'Up from 60% last quarter', icon: 'Percent', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 55, 70) },
            { title: 'First Pass Resolution Rate', value: '88%', description: 'Target: > 90%', icon: 'Target', color: 'hsl(var(--chart-1))', chartData: generateChartData(12, 85, 92) },
            { title: 'Denials by Payer', value: 'OptiCare (40%)', description: 'Requires contract review', icon: 'TrendingUp', color: 'hsl(var(--chart-5))', chartData: generateChartData(12, 30, 50) },
            { title: 'Resolved Denials Value', value: '$250k', description: 'Recovered revenue this month', icon: 'TrendingUp', color: 'hsl(var(--chart-2))', chartData: generateChartData(12, 200, 300) },
            { title: 'Avg. Denial Resolution Time', value: '22 days', description: 'Down from 28 days', icon: 'TrendingDown', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 20, 30) },
        ]
    },
    'cost-reduction': {
        title: 'Cost Reduction',
        slug: 'cost-reduction',
        description: 'Measures the effectiveness of cost-saving initiatives within the revenue cycle.',
        icon: TrendingUp,
        unit: '%',
        chartType: 'line',
        mainChartData: generateChartData(12, 5, 15),
        subMetrics: [
            { title: 'Automation Savings', value: '$45k', description: 'From AI agent implementation', icon: 'TrendingUp', color: 'hsl(var(--chart-1))', chartData: generateChartData(12, 30, 50) },
            { title: 'Vendor Spend', value: '$1.2M', description: 'Down 8% from last year', icon: 'TrendingDown', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 1100, 1300) },
            { title: 'Cost per Claim', value: '$8.50', description: 'Reduced from $10.25', icon: 'TrendingDown', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 8, 12) },
            { title: 'Staff Overtime Hours', value: '120 hrs', description: 'Down 30% this quarter', icon: 'TrendingDown', color: 'hsl(var(--chart-2))', chartData: generateChartData(12, 100, 200) },
            { title: 'Return on Investment (ROI)', value: '180%', description: 'For new RCM platform', icon: 'Percent', color: 'hsl(var(--chart-5))', chartData: generateChartData(12, 150, 200) },
            { title: 'Supply Cost', value: '$30k', description: 'Stable performance', icon: 'Hourglass', color: 'hsl(var(--chart-4))', chartData: generateChartData(12, 25, 35) },
        ]
    },
    'eligibility-speed': {
        title: 'Eligibility Speed',
        slug: 'eligibility-speed',
        description: 'The average time taken to verify a patient\'s insurance eligibility.',
        icon: Zap,
        unit: ' hrs',
        chartType: 'bar',
        mainChartData: generateChartData(12, 4, 12),
        subMetrics: [
            { title: 'Real-time Verification Rate', value: '98%', description: 'Up from 95%', icon: 'Percent', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 90, 100) },
            { title: 'Manual Verifications', value: '150/day', description: 'Down from 300/day', icon: 'TrendingDown', color: 'hsl(var(--chart-1))', chartData: generateChartData(12, 100, 350) },
            { title: 'Verification Errors', value: '1.2%', description: 'Below 2% target', icon: 'Target', color: 'hsl(var(--chart-2))', chartData: generateChartData(12, 1, 3) },
            { title: 'Coverage Discovery Rate', value: '8%', description: 'Finding previously unknown coverage', icon: 'TrendingUp', color: 'hsl(var(--chart-5))', chartData: generateChartData(12, 5, 10) },
            { title: 'Avg. API Response Time', value: '350ms', description: 'Well within SLA', icon: 'Hourglass', color: 'hsl(var(--chart-4))', chartData: generateChartData(12, 300, 500) },
            { title: 'Pre-auth Turnaround', value: '2.1 days', description: 'Improved from 3 days', icon: 'TrendingDown', color: 'hsl(var(--chart-3))', chartData: generateChartData(12, 2, 4) },
        ]
    },
}

export const mockReports = [
  { id: '1', name: 'Q2 2024 Financial Summary', type: 'Financial', dateGenerated: '2024-07-01' },
  { id: '2', name: 'Monthly Denial Analysis - June', type: 'Operational', dateGenerated: '2024-07-01' },
  { id: '3', name: 'HIPAA Compliance Audit Trail', type: 'Compliance', dateGenerated: '2024-06-30' },
  { id: '4', name: 'Payer Performance Review', type: 'Financial', dateGenerated: '2024-06-28' },
  { id: '5', name: 'AI Agent Productivity Report', type: 'Operational', dateGenerated: '2024-06-28' },
  { id: '6', name: 'Annual Cost Reduction Analysis', type: 'Financial', dateGenerated: '2024-06-27' },
  { id: '7', name: 'Patient Wait Time Report', type: 'Operational', dateGenerated: '2024-06-25' },
];

const firstNames = ["Olivia", "Liam", "Emma", "Noah", "Amelia", "Oliver", "Ava", "Elijah", "Sophia", "Mateo"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const statuses = ['Active', 'Discharged', 'Inactive', 'Deceased'];

export const mockPatients = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const dob = new Date(1950 + Math.floor(Math.random() * 60), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
  const lastVisit = subDays(new Date(), Math.floor(Math.random() * 365));

  return {
    id: `P${(100000 + i).toString()}`,
    name: `${firstName} ${lastName}`,
    dob: format(dob, 'MM/dd/yyyy'),
    lastVisit: format(lastVisit, 'MM/dd/yyyy'),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
});

export const mockAlerts = {
    ongoing: [
        { id: 'on_1', title: 'High Denial Rate from OptiCare', severity: 'high' as const, description: 'Denial rate from OptiCare has spiked to 25% in the last 48 hours, primarily due to "missing pre-authorization" codes. Immediate investigation required.' },
        { id: 'on_2', title: 'Payment Posting Agent Experiencing High Latency', severity: 'medium' as const, description: 'The payment posting agent is taking over 5 minutes to process ERA files, causing a backlog. System resources are being monitored.' },
    ],
    potential: [
        { id: 'pot_1', title: 'Upcoming CPT Code Changes', severity: 'medium' as const, description: 'A new set of CPT codes for telehealth services will be effective next month. Proactive training for coding staff is recommended to prevent claim denials.' },
        { id: 'pot_2', title: 'Increase in Self-Pay Accounts', severity: 'low' as const, description: 'The volume of self-pay accounts has increased by 15% month-over-month. Financial counseling services may need to be scaled.' },
        { id: 'pot_3', title: 'Payer Portal API Deprecation Notice', severity: 'high' as const, description: 'WellPoint has announced the deprecation of their V2 API in 90 days. Migration to V3 is required to maintain automated eligibility checks.' },
    ],
    resolved: [
        { id: 'res_1', title: 'Claim Submission Agent Failure', severity: 'high' as const, description: 'The agent was failing due to an expired API token. The token has been refreshed and service is restored.', resolvedAt: subDays(new Date(), 1) },
        { id: 'res_2', title: 'Incorrect Billing Code for Flu Shots', severity: 'medium' as const, description: 'An incorrect billing code was used for a batch of 200 flu shot claims. Claims have been rebilled with the correct code.', resolvedAt: subDays(new Date(), 3) },
        { id: 'res_3', title: 'Network Latency in Data Center East-2', severity: 'low' as const, description: 'Traffic was rerouted to West-1 while network maintenance was performed. Normal operations have resumed.', resolvedAt: subDays(new Date(), 5) },
    ]
}
