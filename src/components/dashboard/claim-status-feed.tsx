'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const initialFeedItems = [
  { id: 1, text: 'Claim #7A4B1C - Approved', status: 'approved' as const, provider: 'OptiCare', amount: 450.75 },
  { id: 2, text: 'Claim #XF9D3A - Denial review initiated', status: 'denied' as const, provider: 'WellPoint', amount: 1200.00 },
  { id: 3, text: 'Claim #K2P5G8 - Pending documentation', status: 'pending' as const, provider: 'HealthFirst', amount: 85.20 },
  { id: 4, text: 'Claim #L9M3N2 - Payment posted', status: 'approved' as const, provider: 'MetroHealth', amount: 325.50 },
  { id: 5, text: 'Claim #C6V8B4 - Sent to collections', status: 'denied' as const, provider: 'Unity Medical', amount: 550.00 },
  { id: 6, text: 'Claim #R5T6Y7 - Eligibility verified', status: 'pending' as const, provider: 'FirstChoice', amount: 1500.00 },
  { id: 7, text: 'Claim #E2W3S1 - Approved', status: 'approved' as const, provider: 'OptiCare', amount: 980.10 },
  { id: 8, text: 'Claim #Z1QAY3 - Additional info requested', status: 'pending' as const, provider: 'WellPoint', amount: 230.00 },
];

const statusMap = {
  approved: { icon: <CheckCircle className="text-green-400" />, color: 'text-green-400' },
  denied: { icon: <XCircle className="text-red-400" />, color: 'text-red-400' },
  pending: { icon: <Clock className="text-yellow-400" />, color: 'text-yellow-400' },
};

export function ClaimStatusFeed() {
    const [feedItems, setFeedItems] = useState(initialFeedItems);

    useEffect(() => {
        const interval = setInterval(() => {
            setFeedItems(prevItems => {
                const newItem = {
                    id: Date.now(),
                    text: `Claim #${Math.random().toString(36).substring(2, 8).toUpperCase()} - New submission`,
                    status: 'pending' as const,
                    provider: 'NewNet Health',
                    amount: parseFloat((Math.random() * 2000).toFixed(2)),
                };
                const updatedItems = [...prevItems.slice(1), newItem];
                return updatedItems;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    // Duplicate the items for a seamless loop
    const displayItems = [...feedItems, ...feedItems];

    return (
        <Card className="glassmorphic col-span-1 xl:col-span-5 overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Database /> Live Claims Feed
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="relative w-full overflow-hidden">
                    <div className="flex animate-marquee hover:[animation-play-state:paused]">
                        {displayItems.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex-shrink-0 flex items-center mx-4 py-2 text-sm whitespace-nowrap">
                                <span className="mr-3">{statusMap[item.status].icon}</span>
                                <div className='flex flex-col'>
                                  <p className="font-medium">{item.text} <span className="text-muted-foreground font-mono">from {item.provider}</span></p>
                                  <p className={cn("font-bold text-xs", statusMap[item.status].color)}>${item.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
