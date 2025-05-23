
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { NoVendorSpend as NoVendorSpendType, formatCurrency } from '@/services/api';

interface DataSourceBreakdownProps {
  data: NoVendorSpendType[];
  isLoading: boolean;
  showMillions: boolean;
}

// Use our new branded colors
const COLORS = ['#5CAADE', '#AFDAF5', '#ED815F', '#FBA589'];

const DataSourceBreakdown: React.FC<DataSourceBreakdownProps> = ({
  data,
  isLoading,
  showMillions,
}) => {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend by Data Source</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-lg font-semibold">
              Total: {formatCurrency(totalAmount, showMillions)}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="source"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value, showMillions)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataSourceBreakdown;
