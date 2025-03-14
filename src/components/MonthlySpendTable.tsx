
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpendData, formatCurrency } from '@/services/api';

interface MonthlySpendTableProps {
  data: SpendData[];
  isLoading: boolean;
  showMillions: boolean;
}

const MonthlySpendTable: React.FC<MonthlySpendTableProps> = ({
  data,
  isLoading,
  showMillions,
}) => {
  // Calculate total row
  const totalBseg = data.reduce((sum, item) => sum + item.bseg, 0);
  const totalAmount = data.reduce((sum, item) => sum + item.total, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spend Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">BSEG</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.bseg, showMillions)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.total, showMillions)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-muted/50">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{formatCurrency(totalBseg, showMillions)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalAmount, showMillions)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlySpendTable;
