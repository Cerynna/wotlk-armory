import axios from "axios";
import { API_URL } from "..";

export async function getBossByTag(tag: string) {
  let response = await axios.get(API_URL + "boss/" + tag, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data;
}

export async function getBosses() {
  let response = await axios.get(API_URL + "boss", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data;
}
