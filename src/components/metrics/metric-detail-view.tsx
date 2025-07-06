'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Hourglass, Percent, Target, DollarSign, FileCheck, Zap } from 'lucide-react';
import type { KpiDetail } from '@/lib/mock-data';

type MetricDetailViewProps = {
  kpi: KpiDetail;
};

const iconMap: { [key: string]: React.ElementType } = {
  'TrendingUp': TrendingUp,
  'TrendingDown': TrendingDown,
  'Hourglass': Hourglass,
  'Percent': Percent,
  'Target': Target,
  'DollarSign': DollarSign,
  'FileCheck': FileCheck,
  'Zap': Zap,
};

export function MetricDetailView({ kpi }: MetricDetailViewProps) {
  const MainChartComponent = kpi.chartType === 'bar' ? BarChart : LineChart;
  const KpiIcon = iconMap[kpi.icon];
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-glow flex items-center gap-3">
          {KpiIcon && <KpiIcon className="w-8 h-8 text-primary" />}
          {kpi.title}
        </h1>
        <p className="text-muted-foreground">{kpi.description}</p>
      </header>

      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle>Historical Performance (Last 12 Months)</CardTitle>
          <CardDescription>Detailed monthly view of the {kpi.title.toLowerCase()} metric.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] w-full">
           <ResponsiveContainer width="100%" height="100%">
            <MainChartComponent data={kpi.mainChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit={kpi.unit} />
              <RechartsTooltip 
                  contentStyle={{
                      background: 'hsl(var(--background) / 0.8)',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  wrapperClassName="!text-sm"
              />
              {kpi.chartType === 'bar' ? 
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /> :
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
              }
            </MainChartComponent>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpi.subMetrics.map((metric) => {
          const Icon = iconMap[metric.icon];
          return (
            <Card key={metric.title} className="glassmorphic">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-glow" style={{color: metric.color}}>{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
                <div className="h-20 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`color-${metric.title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={metric.color} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <RechartsTooltip 
                        cursor={false}
                        contentStyle={{ display: 'none' }}
                      />
                      <Area type="monotone" dataKey="value" stroke={metric.color} strokeWidth={2} fillOpacity={1} fill={`url(#color-${metric.title.replace(/\s/g, '')})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

    </div>
  );
}
