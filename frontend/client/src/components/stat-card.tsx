import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold font-mono" data-testid={`text-${title.toLowerCase().replace(/\s+/g, "-")}-value`}>
          {value}
        </div>
        {trend && (
          <p className={`text-xs mt-1 ${trend.positive ? 'text-primary' : 'text-destructive'}`}>
            {trend.positive ? '+' : ''}{trend.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
