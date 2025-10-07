import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTransactionSchema } from "@shared/schema";
import { z } from "zod";
import { format } from "date-fns";

const categories = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: ["Food", "Shopping", "Transportation", "Housing", "Entertainment", "Healthcare", "Other"],
};

interface AddTransactionDialogProps {
  onAdd?: (transaction: any) => void;
}

export function AddTransactionDialog({ onAdd }: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");

  const form = useForm<z.infer<typeof insertTransactionSchema>>({
    resolver: zodResolver(insertTransactionSchema),
    defaultValues: {
      amount: "",
      category: "",
      description: "",
      type: "expense",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const onSubmit = (data: z.infer<typeof insertTransactionSchema>) => {
    console.log("Transaction added:", data);
    onAdd?.(data);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-add-transaction">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-add-transaction">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your transaction below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={field.value === "expense" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => {
                        field.onChange("expense");
                        setTransactionType("expense");
                        form.setValue("category", "");
                      }}
                      data-testid="button-type-expense"
                    >
                      Expense
                    </Button>
                    <Button
                      type="button"
                      variant={field.value === "income" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => {
                        field.onChange("income");
                        setTransactionType("income");
                        form.setValue("category", "");
                      }}
                      data-testid="button-type-income"
                    >
                      Income
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        {...field}
                        type="text"
                        placeholder="0.00"
                        className="pl-7 font-mono"
                        data-testid="input-amount"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories[transactionType].map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter a description"
                      className="resize-none"
                      rows={3}
                      data-testid="input-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      data-testid="input-date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" data-testid="button-submit-transaction">
                Add Transaction
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
