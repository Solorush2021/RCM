'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountUp } from './count-up';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import Link from 'next/link';

type KpiCardProps = {
  title: string;
  value: number;
  change: number;
  sentiment: 'good' | 'bad' | 'neutral';
  prefix?: string;
  suffix?: string;
  icon: ReactNode;
  data: { value: number }[];
  color: string;
};

export function KpiCard({ title, value, change, sentiment, prefix, suffix, icon, data, color }: KpiCardProps) {
  const getChangeIcon = () => {
    if (change > 0) return <ArrowUp className="w-4 h-4" />;
    if (change < 0) return <ArrowDown className="w-4 h-4" />;
    return null;
  };

  const getChangeColor = () => {
    if (sentiment === 'good') return 'text-green-400';
    if (sentiment === 'bad') return 'text-red-400';
    return 'text-muted-foreground';
  };

  const slug = title.toLowerCase().replace(/\s|\//g, '-');

  return (
    <Link href={`/metrics/${slug}`} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-lg">
      <Card className="glassmorphic w-full transition-all duration-300 hover:shadow-neon-primary hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="w-8 h-8 p-2 rounded-lg" style={{backgroundColor: `${color}1A`, color: color}}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start">
              <div>
                  <div className="text-4xl font-bold text-glow" style={{color: color}}>
                      <CountUp end={value} prefix={prefix} suffix={suffix} />
                  </div>
                  <p className={cn("text-xs flex items-center gap-1", getChangeColor())}>
                      {getChangeIcon()}
                      {typeof change === 'number' ? `${Math.abs(change).toFixed(1)}% from last period` : 'N/A'}
                  </p>
              </div>
              <div className="w-24 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                              <linearGradient id={`color-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#color-${title.replace(/\s/g, '')})`} />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
