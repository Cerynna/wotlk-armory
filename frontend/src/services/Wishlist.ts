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

export async function getWishlists(): Promise<Wishlist[]> {
  const response = await axios.get(API_URL + "wishlist", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data;
}

export async function togglevalidateWishlist(
  wishlistID: number,
  value: boolean
): Promise<boolean> {
  const response = await axios.post(
    API_URL + "wishlist/togglevalid",
    {
      id: wishlistID,
      value: value,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

export async function deleteWishlist(wishlistID: number): Promise<void> {
  await axios.delete(API_URL + "wishlist/" + wishlistID, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

export async function deleteItemWishlist(userID: number, itemID: number) {
  let response = await axios.post(
    API_URL + "wishlist/item/" + itemID,
    {
      userID,
      itemID,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}
