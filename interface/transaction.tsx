export interface TransactionInterface {
  id: string;
  type: "debit" | "credit";
  description: string;
  date: string;
  amount: number;
  currency: "MYR" | "USD" | "SGD";
}
