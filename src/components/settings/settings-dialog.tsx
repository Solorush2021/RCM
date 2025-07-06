import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '../ui/separator';

export function SettingsDialog() {
  return (
    <DialogContent className="max-w-md bg-background/80 backdrop-blur-lg border-primary/20">
      <DialogHeader>
        <DialogTitle className="text-primary text-glow">Settings</DialogTitle>
        <DialogDescription>
          Manage your dashboard and notification preferences.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-6">
        <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Notifications</h4>
            <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="alert-sound">Alert Sound</Label>
                <Switch id="alert-sound" defaultChecked/>
            </div>
        </div>
        <Separator />
        <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Appearance</h4>
            <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <Switch id="high-contrast" />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="data-density">Dense Data View</Label>
                <Switch id="data-density" />
            </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" variant="outline">Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
