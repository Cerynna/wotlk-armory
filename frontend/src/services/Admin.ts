import axios from "axios";
import { API_URL } from "..";

export async function deleteItem(id: number) {
  const response = await axios.post(
    `${API_URL}item/delete`,
    { id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

export async function getItemFromWoWHead(itemID: string) {
  const response = await axios.get(`${API_URL}item/scrap/${itemID}`);
  return response.data;
}

export async function addItemToBoss(
  bossTag: string,
  item: any,
  sizeMode: string
) {
  const response = await axios.post(
    `${API_URL}item/add`,
    { bossTag, item, sizeMode },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}
