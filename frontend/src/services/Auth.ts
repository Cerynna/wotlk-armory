import axios from "axios";

const API_URL = "http://localhost:5000/";
export async function login(login: string, password: string) {
  console.log("login", login, password);
  let response = await axios.post(API_URL + "auth/", {
    login: login,
    password: password,
  });
  if (response.data) {
    console.log(response.data);
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
      console.log(error);
      return false;
    });
}
