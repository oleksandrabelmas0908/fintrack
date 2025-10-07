import { StatCard } from '../stat-card';
import { Wallet } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-6 bg-background">
      <StatCard
        title="Total Balance"
        value="$12,450.00"
        icon={Wallet}
        trend={{ value: "12.5%", positive: true }}
      />
    </div>
  );
}
