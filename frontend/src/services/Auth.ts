import axios from "axios";
import { API_URL } from "..";

export async function login(login: string, password: string) {
  let response = await axios.post(API_URL + "auth/", {
    login: login,
    password: password,
  });
  if (response.data) {
    return response.data;
  }
  return false;
}

export function logout() {
  return false;
}

export async function whoiam() {
  return await axios
    .get(API_URL + "auth/whoiam", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return false;
    });
}
