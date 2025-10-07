import { useState, useEffect } from "react";
import { StatCard } from "@/components/stat-card";
import { TransactionList } from "@/components/transaction-list";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { SpendingChart } from "@/components/spending-chart";
import { TrendChart } from "@/components/trend-chart";
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

import { logout } from "../lib/auth";
import { Button } from "@/components/ui/button";
import { User, getUser } from "@/lib/user";


export default function Dashboard() {


  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const isAuthenticated = !!localStorage.getItem("access_token");

  useEffect(() => {
    // Load user data when component mounts
    async function fetchUser() {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoadingUser(false);
      }
    }

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  console.log("Token:", localStorage.getItem("access_token"));
  console.log("Is authenticated:", isAuthenticated);


  // TODO: remove mock functionality - replace with real data from API
  const [transactions, setTransactions] = useState([
    { id: '1', amount: '2500.00', category: 'Salary', description: 'Monthly Salary', type: 'income' as const, date: new Date('2024-01-15') },
    { id: '2', amount: '45.99', category: 'Food', description: 'Grocery Shopping', type: 'expense' as const, date: new Date('2024-01-14') },
    { id: '3', amount: '120.00', category: 'Shopping', description: 'New Shoes', type: 'expense' as const, date: new Date('2024-01-13') },
    { id: '4', amount: '1200.00', category: 'Housing', description: 'Monthly Rent', type: 'expense' as const, date: new Date('2024-01-01') },
    { id: '5', amount: '50.00', category: 'Transportation', description: 'Gas', type: 'expense' as const, date: new Date('2024-01-12') },
  ]);

  // TODO: remove mock functionality - calculate from real transactions
  const spendingData = [
    { category: 'Food', amount: 450, color: 'hsl(var(--chart-1))' },
    { category: 'Shopping', amount: 320, color: 'hsl(var(--chart-2))' },
    { category: 'Transportation', amount: 180, color: 'hsl(var(--chart-3))' },
    { category: 'Housing', amount: 1200, color: 'hsl(var(--chart-4))' },
    { category: 'Other', amount: 250, color: 'hsl(var(--chart-5))' },
  ];

  // TODO: remove mock functionality - calculate from real transactions
  const trendData = [
    { month: 'Jan', income: 2500, expenses: 1800 },
    { month: 'Feb', income: 2500, expenses: 2100 },
    { month: 'Mar', income: 3000, expenses: 1950 },
    { month: 'Apr', income: 2500, expenses: 2200 },
    { month: 'May', income: 2700, expenses: 1900 },
    { month: 'Jun', income: 2500, expenses: 2400 },
  ];
  console.log("Is authenticated:", isAuthenticated);

  const handleAddTransaction = (transaction: any) => {
    console.log("Adding transaction:", transaction);
    // TODO: remove mock functionality - send to API instead
    const newTransaction = {
      id: Date.now().toString(),
      ...transaction,
      date: new Date(transaction.date),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Financial Tracker</h1>
            <p className="text-muted-foreground mt-1">
              Track your income and expenses with ease
            </p>
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              Welcome{user ? `, ${user.username}` : ""}
            </h1>
            <p className="text-muted-foreground mt-1">
              {user ? `Email: ${user.email}` : "Loading user data..."}
            </p>
          </div>
          <AddTransactionDialog onAdd={handleAddTransaction} />
          <Button
            variant="destructive"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value="$12,450.00"
            icon={Wallet}
            trend={{ value: "12.5%", positive: true }}
          />
          <StatCard
            title="Total Income"
            value="$15,700.00"
            icon={TrendingUp}
            trend={{ value: "8.2%", positive: true }}
          />
          <StatCard
            title="Total Expenses"
            value="$3,250.00"
            icon={TrendingDown}
            trend={{ value: "3.1%", positive: false }}
          />
          <StatCard
            title="Savings Rate"
            value="78%"
            icon={DollarSign}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TrendChart data={trendData} />
          <SpendingChart data={spendingData} />
        </div>

        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
