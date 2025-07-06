'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe } from 'lucide-react';

// Simplified world map paths
const WorldMap = () => (
    <svg viewBox="0 0 1000 500" className="w-full h-full fill-current text-primary/20 stroke-primary/50" strokeWidth="0.5">
        <path d="M499.9 48.2c-113.8 0-209.6 44.4-209.6 99.2 0 35.8 55.4 67.8 128.5 86.8-59.8 4.2-111.7 18.3-138.8 33.1-29.4 16.1-33.8 35.3-33.8 40.2 0 29.4 97.4 53.2 217.6 53.2s217.6-23.8 217.6-53.2c0-4.9-4.4-24.1-33.8-40.2-27.1-14.8-79-28.9-138.8-33.1 73.1-19 128.5-51 128.5-86.8.1-54.8-95.7-99.2-209.5-99.2zm-225.5 251.3c-21.7 0-41.9-4.2-59.3-11.8-10.1 14.1-15.6 30.7-15.6 48.1 0 29.4 97.4 53.2 217.6 53.2 6.2 0 12.4-.1 18.5-.4-39.1-12.8-82.6-21.9-122.9-25.7-12.8-1.2-25.9-1.8-39.3-2.1--.3 0-.6-.1-.9-.1zm-105.7-55.9c-29.4-16.1-33.8-35.3-33.8-40.2 0-21.7 23.8-41.2 62.4-53.5 2.1 4.4 4.3 8.7 6.6 12.9-14.9 10.1-26.6 22.3-33.8 35.3-1.4 2.5-1.4 5.4-1.4 5.4s-.1 3.2 2.7 4.9c2.8 1.7 6 1.9 6.2 1.9s4.8-.5 7.2-2.3c2.4-1.8 4.1-4.7 4.1-4.7s2.5-5.3 6.2-9.2c3.7-3.9 8.2-6.7 12.4-8.1 21.6-7.3 48.7-11.3 77-11.3 2.1 0 4.2.1 6.2.1-3.6 15.6-5.6 31.9-5.6 48.9 0 2.5.1 5 .4 7.5-30.8-.2-62.2 4.9-88.5 15.6zM294.6 98.7C294.6 69.3 382 45 502.2 45s207.6 24.3 207.6 53.7-92.6 53.7-207.6 53.7S294.6 128.1 294.6 98.7z"/>
        <path d="M834.4 243.6c-26.3-10.7-57.7-15.8-88.5-15.6.3-2.5.4-5 .4-7.5 0-17-2-33.3-5.6-48.9 2-.1 4.1-.1 6.2-.1 28.3 0 55.4 4 77 11.3 4.2 1.4 8.7 4.2 12.4 8.1 3.7 3.9 6.2 9.2 6.2 9.2s1.7 2.9 4.1 4.7c2.4 1.8 5.7 2.3 7.2 2.3s3.4-.2 6.2-1.9c2.8-1.7 2.7-4.9 2.7-4.9s0-2.9-1.4-5.4c-7.2-13-18.9-25.2-33.8-35.3 2.3-4.2 4.5-8.5 6.6-12.9 38.6 12.3 62.4 31.8 62.4 53.5.1 4.9-4.3 24.1-33.7 40.2zm-123-11.8c-17.4 7.5-37.6 11.8-59.3 11.8-.3 0-.6 0-.9.1-13.4.3-26.5.9-39.3 2.1-40.3 3.8-83.8 12.9-122.9 25.7 6.1.3 12.3.4 18.5.4 120.2 0 217.6-23.8 217.6-53.2.1-17.4-5.5-34-15.6-48.1zM502.2 399.2c-120.2 0-217.6-23.8-217.6-53.2 0-4.9 4.4-24.1 33.8-40.2 27.1-14.8 79-28.9 138.8-33.1-73.1-19-128.5-51-128.5-86.8C328.7 131.1 414.5 86.7 528.3 86.7c113.8 0 209.6 44.4 209.6 99.2 0 35.8-55.4 67.8-128.5 86.8 59.8 4.2 111.7 18.3 138.8 33.1 29.4 16.1 33.8 35.3 33.8 40.2.1 29.4-97.3 53.2-217.5 53.2z"/>
    </svg>
);

const dataPoints = [
    { name: "North America", x: "30%", y: "40%", delay: '0s' },
    { name: "South America", x: "42%", y: "68%", delay: '0.5s' },
    { name: "Europe", x: "53%", y: "35%", delay: '0.2s' },
    { name: "Asia", x: "75%", y: "42%", delay: '0.8s' },
    { name: "Africa", x: "55%", y: "60%", delay: '1s' },
    { name: "Oceania", x: "85%", y: "75%", delay: '0.6s' },
];

export function GlobalOperationsMap() {
    return (
        <Card className="glassmorphic h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe /> Global Data Processing
                </CardTitle>
                <CardDescription>Live transaction hotspots across our network.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow relative">
                <WorldMap />
                {dataPoints.map(point => (
                    <div key={point.name} className="absolute" style={{ left: point.x, top: point.y }}>
                        <div className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative w-full h-full">
                                <div 
                                    className="absolute w-full h-full rounded-full bg-accent animate-pulse-dot"
                                    style={{ animationDelay: point.delay }}
                                />
                                <div className="absolute w-full h-full rounded-full bg-accent/70" />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
