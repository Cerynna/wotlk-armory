import axios from "axios";
import { API_URL } from "..";

export async function getItemById(id: number) {
  return await axios
    .get(API_URL + "item/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return id;
    });
}

