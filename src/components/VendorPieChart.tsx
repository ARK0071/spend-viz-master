
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { VendorData, formatCurrency } from '@/services/api';

interface VendorPieChartProps {
  data: VendorData[];
  isLoading: boolean;
  showMillions: boolean;
}

// Only show top 5 vendors in pie chart, rest as "Others"
const prepareChartData = (vendors: VendorData[]) => {
  if (vendors.length <= 5) return vendors;
  
  const top5 = vendors.slice(0, 5);
  const others = vendors.slice(5);
  const othersSum = others.reduce((sum, vendor) => sum + vendor.amount, 0);
  
  return [
    ...top5,
    {
      id: 999,
      name: "Others",
      amount: othersSum,
      rank: 6
    }
  ];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#AAAAAA'];

const VendorPieChart: React.FC<VendorPieChartProps> = ({
  data,
  isLoading,
  showMillions,
}) => {
  const chartData = prepareChartData(data);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vendor Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  nameKey="name"
                  label={({ name }) => name}
                >
                  {chartData.map((entry, index) => (
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
        )}
      </CardContent>
    </Card>
  );
};

export default VendorPieChart;
