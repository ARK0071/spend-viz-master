
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
import { VendorData, formatCurrency } from '@/services/api';

interface TopVendorsTableProps {
  data: VendorData[];
  isLoading: boolean;
  showMillions: boolean;
}

const TopVendorsTable: React.FC<TopVendorsTableProps> = ({
  data,
  isLoading,
  showMillions,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vendors</CardTitle>
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
                <TableHead>Rank</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.rank}</TableCell>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell className="text-right">{formatCurrency(vendor.amount, showMillions)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TopVendorsTable;
