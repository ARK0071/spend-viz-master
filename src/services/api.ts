
// This file simulates API calls to a Snowflake backend

import { toast } from "@/components/ui/use-toast";

// Types for our data
export interface SpendData {
  id: number;
  date: string;
  dateRaw: string; // For sorting (YYYY-MM format)
  bseg: number;
  total: number;
}

export interface VendorData {
  id: number;
  name: string;
  amount: number;
  rank: number;
}

export interface DataSourceSpend {
  source: string;
  amount: number;
  percentage: number;
}

export interface NoVendorSpend {
  source: string;
  amount: number;
  percentage: number;
}

// Mock data
const mockMonthlyData: SpendData[] = [
  { id: 1, date: "Jan 2023", dateRaw: "2023-01", bseg: 2240866570, total: 2240866570 },
  { id: 2, date: "Feb 2023", dateRaw: "2023-02", bseg: 2403386033, total: 2403386033 },
  { id: 3, date: "Mar 2023", dateRaw: "2023-03", bseg: 2901865440, total: 2901865440 },
  { id: 4, date: "Apr 2023", dateRaw: "2023-04", bseg: 2724646084, total: 2724646084 },
  { id: 5, date: "May 2023", dateRaw: "2023-05", bseg: 3038237400, total: 3038237400 },
  { id: 6, date: "Jun 2023", dateRaw: "2023-06", bseg: 3498376396, total: 3498376396 },
  { id: 7, date: "Jul 2023", dateRaw: "2023-07", bseg: 3250000000, total: 3250000000 },
  { id: 8, date: "Aug 2023", dateRaw: "2023-08", bseg: 3580000000, total: 3580000000 },
];

const mockVendorData: VendorData[] = [
  { id: 1, name: "AGCO International GmbH", amount: 6216393069, rank: 1 },
  { id: 2, name: "TAFE INTERNATIONAL TRAKTOR VE TARIM", amount: 1186113677, rank: 2 },
  { id: 3, name: "AGCO S.A.S", amount: 774662670, rank: 3 },
  { id: 4, name: "AGCO GMBH", amount: 532094583, rank: 4 },
  { id: 5, name: "AGCO CORPORATION", amount: 281282614, rank: 5 },
  { id: 6, name: "AGCO S.P.A.", amount: 211324205, rank: 6 },
  { id: 7, name: "GIMA", amount: 167012685, rank: 7 },
  { id: 8, name: "AGCO Power Inc", amount: 141622209, rank: 8 },
  { id: 9, name: "Skatteetaten avd. Regnskab", amount: 137199338, rank: 9 },
  { id: 10, name: "HUSQVARNA NORGE AS", amount: 129500319, rank: 10 },
  { id: 11, name: "DEUTZ AG", amount: 129091966, rank: 11 },
  { id: 12, name: "Iseki", amount: 117119116, rank: 12 },
  { id: 13, name: "DANA ITALIA S.r.l.", amount: 108661353, rank: 13 },
  { id: 14, name: "Pierwszy Wielkopolski Urzad", amount: 108631591, rank: 14 },
  { id: 15, name: "Vendor 15", amount: 98500000, rank: 15 },
  { id: 16, name: "Vendor 16", amount: 92700000, rank: 16 },
  { id: 17, name: "Vendor 17", amount: 87900000, rank: 17 },
  { id: 18, name: "Vendor 18", amount: 76500000, rank: 18 },
  { id: 19, name: "Vendor 19", amount: 67800000, rank: 19 },
  { id: 20, name: "Vendor 20", amount: 62300000, rank: 20 },
];

const mockNoVendorSpend: NoVendorSpend[] = [
  { source: "BSEG", amount: 987654321, percentage: 78 },
  { source: "AP", amount: 123456789, percentage: 12 },
  { source: "Manual", amount: 98765432, percentage: 10 },
];

const mockDataSourceSpend: DataSourceSpend[] = [
  { source: "BSEG", amount: 16807377923, percentage: 85 },
  { source: "AP", amount: 2124789123, percentage: 10 },
  { source: "Manual", amount: 987654321, percentage: 5 },
];

// API simulation functions with artificial delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchMonthlySpendData(filters?: { startDate?: string; endDate?: string }): Promise<SpendData[]> {
  await delay(800); // Simulate network delay
  
  let filteredData = [...mockMonthlyData];
  
  if (filters) {
    if (filters.startDate) {
      filteredData = filteredData.filter(item => item.dateRaw >= filters.startDate);
    }
    if (filters.endDate) {
      filteredData = filteredData.filter(item => item.dateRaw <= filters.endDate);
    }
  }
  
  return filteredData;
}

export async function fetchTopVendors(limit: number = 20): Promise<VendorData[]> {
  await delay(600);
  return mockVendorData.slice(0, limit);
}

export async function fetchNoVendorSpend(): Promise<NoVendorSpend[]> {
  await delay(500);
  return mockNoVendorSpend;
}

export async function fetchDataSourceSpend(): Promise<DataSourceSpend[]> {
  await delay(700);
  return mockDataSourceSpend;
}

export async function refreshData(): Promise<boolean> {
  await delay(1500);
  toast({
    title: "Data Refreshed",
    description: "Latest spend data has been loaded",
  });
  return true;
}

// Utility functions
export const formatCurrency = (value: number, inMillions: boolean = false): string => {
  if (inMillions) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};
