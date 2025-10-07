import { TrendChart } from '../trend-chart';

export default function TrendChartExample() {
  const mockData = [
    { month: 'Jan', income: 2500, expenses: 1800 },
    { month: 'Feb', income: 2500, expenses: 2100 },
    { month: 'Mar', income: 3000, expenses: 1950 },
    { month: 'Apr', income: 2500, expenses: 2200 },
    { month: 'May', income: 2700, expenses: 1900 },
    { month: 'Jun', income: 2500, expenses: 2400 },
  ];

  return (
    <div className="p-6 bg-background">
      <TrendChart data={mockData} />
    </div>
  );
}
