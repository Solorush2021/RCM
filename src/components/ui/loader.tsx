import { cn } from '@/lib/utils';

export function Loader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-center w-full h-full p-8", className)} {...props}>
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary" />
            <p className="text-muted-foreground text-glow">Loading RCM Data...</p>
        </div>
    </div>
  );
}
