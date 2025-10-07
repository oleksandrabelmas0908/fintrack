import { SpendingChart } from '../spending-chart';

export default function SpendingChartExample() {
  const mockData = [
    { category: 'Food', amount: 450, color: 'hsl(var(--chart-1))' },
    { category: 'Shopping', amount: 320, color: 'hsl(var(--chart-2))' },
    { category: 'Transportation', amount: 180, color: 'hsl(var(--chart-3))' },
    { category: 'Housing', amount: 1200, color: 'hsl(var(--chart-4))' },
    { category: 'Other', amount: 250, color: 'hsl(var(--chart-5))' },
  ];

  return (
    <div className="p-6 bg-background">
      <SpendingChart data={mockData} />
    </div>
  );
}
