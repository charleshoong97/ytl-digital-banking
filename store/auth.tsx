import React from "react";
import { makeObservable, action, observable } from "mobx";

class AuthStore {
  username = "";
  requireBiometricAuthorization = true;

  constructor() {
    makeObservable(this, {
      username: observable,
      requireBiometricAuthorization: observable,
      isLogin: action.bound,
      toggleRequireBiometricAuthorization: action.bound,
      login: action.bound,
      logout: action.bound,
    });
  }

  isLogin() {
    return this.username != "";
  }

  toggleRequireBiometricAuthorization(value: boolean) {
    this.requireBiometricAuthorization = value;
  }

  login(text: string) {
    this.username = text;
  }

  logout() {
    this.requireBiometricAuthorization = true;
  }
}

const authStore = new AuthStore();
const AuthStoreContext = React.createContext(authStore);
export const useAuthStore = () => React.useContext(AuthStoreContext);
