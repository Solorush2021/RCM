'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const initialMetrics = [
    { name: "Global CPU Load", value: 78, colorClass: "bg-chart-1" },
    { name: "Memory Utilization", value: 62, colorClass: "bg-chart-2" },
    { name: "Data I/O Throughput", value: 85, colorClass: "bg-chart-3" },
    { name: "Network Latency", value: 24, colorClass: "bg-chart-5", suffix: "ms" },
];

export function SystemStatus() {
    const [systemMetrics, setSystemMetrics] = useState(initialMetrics);

    useEffect(() => {
        const interval = setInterval(() => {
            setSystemMetrics(prevMetrics =>
                prevMetrics.map(metric => {
                    const change = (Math.random() - 0.5) * 4;
                    let newValue = metric.value + change;
                    if (metric.suffix === 'ms') {
                        newValue = Math.max(10, Math.min(100, newValue));
                    } else {
                        newValue = Math.max(0, Math.min(100, newValue));
                    }
                    return { ...metric, value: newValue };
                })
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="glassmorphic h-full">
            <CardHeader>
                <CardTitle>Live System Monitor</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {systemMetrics.map(metric => (
                        <div key={metric.name}>
                            <div className="flex justify-between items-center mb-1 text-sm">
                                <span className="text-muted-foreground">{metric.name}</span>
                                <span className={`font-mono text-glow text-right`}>
                                    {metric.value.toFixed(1)}{metric.suffix || '%'}
                                </span>
                            </div>
                            <Progress value={metric.suffix === 'ms' ? metric.value : metric.value} indicatorClassName={`${metric.colorClass} transition-all duration-1000 ease-in-out`} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}