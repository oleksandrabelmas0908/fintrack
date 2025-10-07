import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Home, Car, Utensils, Briefcase, Gift, Heart } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  id: string;
  amount: string;
  category: string;
  description: string;
  type: "income" | "expense";
  date: Date | string;
}

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
}

const categoryIcons: Record<string, any> = {
  Shopping: ShoppingBag,
  Housing: Home,
  Transportation: Car,
  Food: Utensils,
  Salary: Briefcase,
  Gift: Gift,
  Other: Heart,
};

export function TransactionList({ transactions, title = "Recent Transactions" }: TransactionListProps) {
  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category] || categoryIcons.Other;
    return Icon;
  };

  return (
    <Card data-testid="card-transaction-list">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions yet. Add your first transaction to get started!
              </div>
            ) : (
              transactions.map((transaction) => {
                const Icon = getCategoryIcon(transaction.category);
                const isIncome = transaction.type === "income";
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 p-3 rounded-md hover-elevate"
                    data-testid={`transaction-item-${transaction.id}`}
                  >
                    <div className={`p-2 rounded-md ${isIncome ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                      <Icon className={`h-4 w-4 ${isIncome ? 'text-primary' : 'text-destructive'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" data-testid={`text-transaction-description-${transaction.id}`}>
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(transaction.date), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isIncome ? (
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 text-destructive" />
                      )}
                      <span
                        className={`text-sm font-semibold font-mono ${isIncome ? 'text-primary' : 'text-destructive'}`}
                        data-testid={`text-transaction-amount-${transaction.id}`}
                      >
                        {isIncome ? '+' : '-'}${transaction.amount}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
