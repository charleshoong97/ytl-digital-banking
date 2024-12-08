import React from "react";
import { makeObservable, action, observable } from "mobx";
import { TransactionInterface } from "@/interface/transaction";
import { firebaseRead } from "@/firebase/firebaseAction";
import dayjs from "dayjs";

// export const dummyData: TransactionInterface[] = [
//   {
//     id: "SDFSDVASDBFY1123N",
//     type: "debit",
//     description: "Pocket Money",
//     amount: 521,
//     date: "2024-12-06 12:12:22",
//     currency: "MYR",
//   },
//   {
//     id: "K18SJD128NSDFS",
//     type: "debit",
//     description: "Side Income",
//     amount: 820,
//     date: "2024-11-25 12:12:22",
//     currency: "MYR",
//   },
//   {
//     id: "D5S2D4FS62S91LS",
//     type: "credit",
//     description: "Protein",
//     amount: 210.22,
//     date: "2024-10-22 06:21:02",
//     currency: "MYR",
//   },
//   {
//     id: "55DSD59863DFS663S",
//     type: "credit",
//     description: "Rental",
//     amount: 550,
//     date: "2024-29-25 12:12:22",
//     currency: "MYR",
//   },
//   {
//     id: "F9812SDFSD6212SDF",
//     type: "credit",
//     description: "Lunch",
//     amount: 9,
//     date: "2024-11-18 10:10:42",
//     currency: "MYR",
//   },
//   {
//     id: "KF559FS3FD5FDS",
//     type: "credit",
//     description: "Transportation",
//     amount: 400,
//     date: "2024-12-03 14:28:22",
//     currency: "MYR",
//   },
//   {
//     id: "LOPW1F236QQSC885",
//     type: "credit",
//     description: "Petrol",
//     amount: 50.02,
//     date: "2024-18-25 19:31:22",
//     currency: "MYR",
//   },
// ];

class TransactionStore {
  transaction: TransactionInterface[] = [];

  constructor() {
    makeObservable(this, {
      transaction: observable,
      syncTransaction: action.bound,
      clearTransaction: action.bound,
    });
  }

  async syncTransaction() {
    try {
      const trans = await firebaseRead("transaction");
      if (trans) {
        this.transaction = trans
          .sort((a, b) => b.date - a.date)
          .map((t) => ({
            id: t.id,
            amount: t.amount,
            currency: t.currency,
            type: t.type,
            description: t.description,
            date: dayjs(t.date.toDate()).format("DD MMM YYYY hh:mm:ss A"),
          }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  clearTransaction() {
    this.transaction = [];
  }
}

const transactionStore = new TransactionStore();
const TransactionStoreContext = React.createContext(transactionStore);
export const useTransactionStore = () =>
  React.useContext(TransactionStoreContext);
