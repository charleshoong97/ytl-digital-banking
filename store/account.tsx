import React from "react";
import { makeObservable, action, observable } from "mobx";

class AccountStore {
  displayName = "";

  constructor() {
    makeObservable(this, {
      displayName: observable,
      authorizeAccess: action.bound,
      clearAccount: action.bound,
    });
  }

  authorizeAccess(name: string) {
    this.displayName = name;
  }

  clearAccount() {
    this.displayName = "";
  }
}

const accountStore = new AccountStore();
const AccountStoreContext = React.createContext(accountStore);
export const useAccountStore = () => React.useContext(AccountStoreContext);
