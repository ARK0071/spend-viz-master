
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/services/api';

// Mock data for GL Descriptions
const mockGLData = [
  { id: 1, description: "Office Supplies", amount: 345678900 },
  { id: 2, description: "IT Equipment", amount: 298765400 },
  { id: 3, description: "Professional Services", amount: 187654300 },
  { id: 4, description: "Travel Expenses", amount: 156789000 },
  { id: 5, description: "Rent", amount: 98765000 },
];

interface GLDescriptionBreakdownProps {
  isLoading?: boolean;
  showMillions: boolean;
}

const GLDescriptionBreakdown: React.FC<GLDescriptionBreakdownProps> = ({
  isLoading = false,
  showMillions,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spend by GL Description</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {mockGLData.map((item) => (
              <div 
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span className="font-medium text-sm text-gray-800">{item.description}</span>
                <span className="text-sm font-semibold text-[#013B80]">
                  {formatCurrency(item.amount, showMillions)}
                </span>
              </div>
            ))}
            
            <div className="pt-2 text-xs text-gray-500 italic text-center">
              This data will be dynamically loaded from Snowflake in the future
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GLDescriptionBreakdown;
