
import { useQuery } from "@tanstack/react-query";
import {
  fetchMonthlySpendData,
  fetchTopVendors,
  fetchNoVendorSpend,
  fetchDataSourceSpend,
  refreshData,
  SpendData,
  VendorData,
  NoVendorSpend,
  DataSourceSpend
} from "@/services/api";

export function useMonthlySpendData(filters?: { startDate?: string; endDate?: string }) {
  return useQuery<SpendData[]>({
    queryKey: ['monthlySpend', filters],
    queryFn: () => fetchMonthlySpendData(filters),
  });
}

export function useTopVendors(limit: number = 20) {
  return useQuery<VendorData[]>({
    queryKey: ['topVendors', limit],
    queryFn: () => fetchTopVendors(limit),
  });
}

export function useNoVendorSpend() {
  return useQuery<NoVendorSpend[]>({
    queryKey: ['noVendorSpend'],
    queryFn: fetchNoVendorSpend,
  });
}

export function useDataSourceSpend() {
  return useQuery<DataSourceSpend[]>({
    queryKey: ['dataSourceSpend'],
    queryFn: fetchDataSourceSpend,
  });
}

export function useRefreshData() {
  return useQuery({
    queryKey: ['refreshData'],
    queryFn: refreshData,
    enabled: false, // Only run when explicitly requested
  });
}
