import { TransactionList } from '../transaction-list';

export default function TransactionListExample() {
  const mockTransactions = [
    { id: '1', amount: '2500.00', category: 'Salary', description: 'Monthly Salary', type: 'income' as const, date: new Date('2024-01-15') },
    { id: '2', amount: '45.99', category: 'Food', description: 'Grocery Shopping', type: 'expense' as const, date: new Date('2024-01-14') },
    { id: '3', amount: '120.00', category: 'Shopping', description: 'New Shoes', type: 'expense' as const, date: new Date('2024-01-13') },
  ];

  return (
    <div className="p-6 bg-background">
      <TransactionList transactions={mockTransactions} />
    </div>
  );
}
