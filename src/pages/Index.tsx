
import React, { useState } from 'react';
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import MonthlySpendTable from "@/components/MonthlySpendTable";
import TopVendorsTable from "@/components/TopVendorsTable";
import NoVendorSpend from "@/components/NoVendorSpend";
import DataSourceChart from "@/components/DataSourceChart";
import MonthlyTrendChart from "@/components/MonthlyTrendChart";
import VendorPieChart from "@/components/VendorPieChart";
import { useMonthlySpendData, useTopVendors, useNoVendorSpend } from "@/hooks/use-spend-data";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from '@/services/api';

const Index = () => {
  const [showMillions, setShowMillions] = useState(true);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  
  // Convert date range to string format for API filtering
  const dateFilters = {
    startDate: dateRange.from ? dateRange.from.toISOString().substring(0, 7) : undefined,
    endDate: dateRange.to ? dateRange.to.toISOString().substring(0, 7) : undefined,
  };
  
  // Fetch data with react-query
  const { data: monthlyData = [], isLoading: isLoadingMonthly } = useMonthlySpendData(dateFilters);
  const { data: vendorData = [], isLoading: isLoadingVendors } = useTopVendors(20);
  const { data: noVendorData = [], isLoading: isLoadingNoVendor } = useNoVendorSpend();
  
  // Handle date range changes
  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range);
  };
  
  // Handle display format toggle
  const handleDisplayToggle = (showMillions: boolean) => {
    setShowMillions(showMillions);
  };
  
  // Handle export action
  const handleExport = () => {
    // In a real app, this would generate a CSV or Excel file
    toast({
      title: "Export Initiated",
      description: "Your data export has started and will download shortly.",
    });
    
    // For demo, create a simple CSV download of the monthly data
    const headers = ['Date', 'BSEG', 'Total'];
    const dataRows = monthlyData.map(item => [
      item.date,
      formatCurrency(item.bseg, false).replace('$', ''),
      formatCurrency(item.total, false).replace('$', '')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...dataRows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'spend_summary.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onExport={handleExport} />
      
      <main className="flex-1 dashboard-container">
        <h1 className="text-3xl font-bold mb-6 text-center">Data Validation Summary</h1>
        
        <Filters
          onDateRangeChange={handleDateRangeChange}
          onDisplayMillionsToggle={handleDisplayToggle}
          showMillions={showMillions}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MonthlyTrendChart 
            data={monthlyData} 
            isLoading={isLoadingMonthly}
            showMillions={showMillions}
          />
          <DataSourceChart 
            data={monthlyData} 
            isLoading={isLoadingMonthly}
            showMillions={showMillions}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <MonthlySpendTable 
              data={monthlyData} 
              isLoading={isLoadingMonthly}
              showMillions={showMillions}
            />
          </div>
          <div>
            <NoVendorSpend 
              data={noVendorData} 
              isLoading={isLoadingNoVendor}
              showMillions={showMillions}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TopVendorsTable 
              data={vendorData} 
              isLoading={isLoadingVendors}
              showMillions={showMillions}
            />
          </div>
          <div>
            <VendorPieChart 
              data={vendorData} 
              isLoading={isLoadingVendors}
              showMillions={showMillions}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
