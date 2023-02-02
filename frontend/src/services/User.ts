import axios from "axios";
import { API_URL } from "..";

export async function getUsers() {
  return await axios
    .get(API_URL + "user", {
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

export async function postBeAdmin(id: number) {
  return await axios
    .post(
      API_URL + "user/beadmin",
      {
        id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return false;
    });
}
