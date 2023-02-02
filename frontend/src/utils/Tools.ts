import { User } from "../types/User";
import useLocalStorage from "./UselocalStorage";

export function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user") || "{}") as User;
  return user && user.isAdmin ? true : false;
}
