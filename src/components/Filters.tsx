
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FiltersProps {
  onDateRangeChange: (range: { from?: Date; to?: Date }) => void;
  onDisplayMillionsToggle: (showMillions: boolean) => void;
  showMillions: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  onDateRangeChange,
  onDisplayMillionsToggle,
  showMillions,
}) => {
  const [date, setDate] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  const handleSelect = (value: { from?: Date; to?: Date }) => {
    setDate(value);
    onDateRangeChange(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Filters</h3>
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal w-[240px]",
                    !date.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date.from}
                  selected={date}
                  onSelect={handleSelect}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="display-millions">Display in Millions ($M)</Label>
          <Switch
            id="display-millions"
            checked={showMillions}
            onCheckedChange={onDisplayMillionsToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
