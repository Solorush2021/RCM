'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockPatients } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Active': 'default',
  'Discharged': 'secondary',
  'Deceased': 'destructive',
  'Inactive': 'outline'
};

export function PatientsView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 h-screen flex flex-col">
      <header>
        <h1 className="text-3xl font-bold text-glow">Patient Directory</h1>
        <p className="text-muted-foreground">Browse and manage patient records.</p>
      </header>
      <Card className="glassmorphic flex-grow flex flex-col">
        <CardHeader>
            <CardTitle>All Patients</CardTitle>
            <CardDescription>Showing {mockPatients.length} patient records.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-card/80 backdrop-blur-sm">
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-mono text-xs">{patient.id}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.dob}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell className="text-right">
                       <Badge variant={statusVariantMap[patient.status] || 'default'}>{patient.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
