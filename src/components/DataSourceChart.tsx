
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SpendData, formatCurrency } from '@/services/api';

interface DataSourceChartProps {
  data: SpendData[];
  isLoading: boolean;
  showMillions: boolean;
}

const DataSourceChart: React.FC<DataSourceChartProps> = ({
  data,
  isLoading,
  showMillions,
}) => {
  // Transform data for the chart
  const chartData = data.map(item => ({
    date: item.date,
    BSEG: item.bseg,
  }));
  
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
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
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
                <Bar dataKey="BSEG" fill="#3498DB" name="BSEG" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataSourceChart;
