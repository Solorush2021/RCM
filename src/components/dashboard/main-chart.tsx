'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const chartData = [
  { month: 'January', revenue: 186, denials: 80, projected: 200 },
  { month: 'February', revenue: 305, denials: 200, projected: 300 },
  { month: 'March', revenue: 237, denials: 120, projected: 250 },
  { month: 'April', revenue: 273, denials: 190, projected: 280 },
  { month: 'May', revenue: 209, denials: 130, projected: 220 },
  { month: 'June', revenue: 214, denials: 140, projected: 230 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue (k)',
    color: 'hsl(var(--chart-1))',
  },
  denials: {
    label: 'Denials',
    color: 'hsl(var(--chart-4))',
  },
  projected: {
    label: 'Projected (k)',
    color: 'hsl(var(--chart-3))',
  }
} satisfies import('@/components/ui/chart').ChartConfig;


export function MainChart() {
  return (
    <Card className="glassmorphic h-[450px] flex flex-col">
      <CardHeader>
        <CardTitle>Revenue & Projections Overview</CardTitle>
        <CardDescription>Last 6 Months Performance vs. Projections</CardDescription>
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
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="denials" fill="var(--color-denials)" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="projected" stroke="var(--color-projected)" strokeWidth={2} dot={{r:4, fill: "var(--color-projected)", stroke: "var(--color-projected)"}} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}