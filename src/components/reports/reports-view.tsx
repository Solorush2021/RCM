'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockReports } from '@/lib/mock-data';
import { Download, FileBarChart, FileCheck, FileClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const reportTypeMap: { [key: string]: { icon: React.ElementType, badge: 'default' | 'secondary' | 'outline' } } = {
    'Financial': { icon: FileBarChart, badge: 'default' },
    'Compliance': { icon: FileCheck, badge: 'secondary' },
    'Operational': { icon: FileClock, badge: 'outline' },
};


export function ReportsView() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-glow">Report Center</h1>
        <p className="text-muted-foreground">Generate, view, and download system reports.</p>
      </header>
      <Card className="glassmorphic">
        <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>List of all available system-generated reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => {
                const typeInfo = reportTypeMap[report.type] || {icon: FileBarChart, badge: 'default'};
                const Icon = typeInfo.icon;
                return (
                    <TableRow key={report.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            {report.name}
                        </TableCell>
                        <TableCell>
                            <Badge variant={typeInfo.badge}>{report.type}</Badge>
                        </TableCell>
                        <TableCell>{report.dateGenerated}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
