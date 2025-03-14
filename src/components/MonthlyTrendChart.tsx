
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { SpendData, formatCurrency } from '@/services/api';

interface MonthlyTrendChartProps {
  data: SpendData[];
  isLoading: boolean;
  showMillions: boolean;
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({
  data,
  isLoading,
  showMillions,
}) => {
  // Sort data chronologically
  const sortedData = [...data].sort((a, b) => a.dateRaw.localeCompare(b.dateRaw));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spend Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sortedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => {
                    if (showMillions) {
                      return `$${(value / 1000000).toFixed(0)}M`;
                    }
                    return `$${(value / 1000000000).toFixed(1)}B`;
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value, showMillions)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#013B80" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }}
                  name="Total Spend"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyTrendChart;
