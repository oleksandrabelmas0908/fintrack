import { Transaction } from "./Dashboard";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-3">
      {transactions.slice(0, 5).map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                transaction.type === "income" ? "bg-success/10" : "bg-destructive/10"
              }`}
            >
              {transaction.type === "income" ? (
                <ArrowUpRight className="h-5 w-5 text-success" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              {transaction.category}
            </Badge>
            <span
              className={`text-lg font-semibold ${
                transaction.type === "income" ? "text-success" : "text-destructive"
              }`}
            >
              {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
