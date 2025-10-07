import { AddTransactionDialog } from '../add-transaction-dialog';

export default function AddTransactionDialogExample() {
  return (
    <div className="p-6 bg-background">
      <AddTransactionDialog onAdd={(data) => console.log('Transaction:', data)} />
    </div>
  );
}
