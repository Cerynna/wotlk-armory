import axios from "axios";
import { API_URL } from "..";
import { Item } from "../types/Item";
import { Wishlist } from "../types/Wishlist";

export async function postWishlist(
  wishlist: (Item | number)[],
  name: string
): Promise<Wishlist> {
  const response = await axios.post(
    API_URL + "wishlist",
    { items: wishlist, name },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data;
}

export async function postAttribItem(
  itemID: number,
  wishlistID: number
): Promise<void> {
  await axios.post(
    API_URL + "wishlist/attrib",
    {
      itemID,
      wishlistID,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
}

export async function postUnAttribItem(
  itemID: number,
  wishlistID: number
): Promise<void> {
  await axios.post(
    API_URL + "wishlist/unattrib",
    {
      itemID,
      wishlistID,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
}
