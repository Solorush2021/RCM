'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: 'January', revenue: 186, denials: 80 },
  { month: 'February', revenue: 305, denials: 200 },
  { month: 'March', revenue: 237, denials: 120 },
  { month: 'April', revenue: 273, denials: 190 },
  { month: 'May', revenue: 209, denials: 130 },
  { month: 'June', revenue: 214, denials: 140 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue (k)',
    color: 'hsl(var(--chart-1))',
  },
  denials: {
    label: 'Denials',
    color: 'hsl(var(--chart-2))',
  },
} satisfies import('@/components/ui/chart').ChartConfig;


export function MainChart() {
  return (
    <Card className="glassmorphic col-span-1 lg:col-span-2 h-[450px] lg:h-auto flex flex-col">
      <CardHeader>
        <CardTitle>Revenue vs Denials Overview</CardTitle>
        <CardDescription>Last 6 Months</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                <Bar dataKey="denials" fill="var(--color-denials)" radius={4} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
