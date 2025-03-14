
import React from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpendHQLogo from './SpendHQLogo';
import { useRefreshData } from '@/hooks/use-spend-data';

interface HeaderProps {
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExport }) => {
  const { refetch: refreshDataQuery, isLoading: isRefreshing } = useRefreshData();

  const handleRefresh = () => {
    refreshDataQuery();
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <SpendHQLogo />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
