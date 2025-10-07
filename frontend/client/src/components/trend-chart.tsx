import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from "recharts";

interface TrendData {
  month: string;
  income: number;
  expenses: number;
}

interface TrendChartProps {
  data: TrendData[];
  title?: string;
}

export function TrendChart({ data, title = "Income vs Expenses" }: TrendChartProps) {
  return (
    <Card data-testid="card-trend-chart">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => `$${value}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Income"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
