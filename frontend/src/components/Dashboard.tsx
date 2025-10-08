import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { TransactionList } from "./TransactionList";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { ExpenseChart } from "./ExpenseChart";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", description: "Salary", amount: 5000, category: "Income", date: "2025-10-01", type: "income" },
    { id: "2", description: "Groceries", amount: -150, category: "Food", date: "2025-10-02", type: "expense" },
    { id: "3", description: "Electricity Bill", amount: -80, category: "Utilities", date: "2025-10-03", type: "expense" },
    { id: "4", description: "Freelance Project", amount: 800, category: "Income", date: "2025-10-03", type: "income" },
    { id: "5", description: "Restaurant", amount: -65, category: "Food", date: "2025-10-04", type: "expense" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0));

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions([
      { ...transaction, id: Date.now().toString() },
      ...transactions,
    ]);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Tracker</h1>
            <p className="text-muted-foreground">Track your income and expenses</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Add Transaction
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-card transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${totalBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Current balance</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">${totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Transactions */}
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseChart transactions={transactions} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-border">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList transactions={transactions} />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={handleAddTransaction}
      />
    </div>
  );
}
