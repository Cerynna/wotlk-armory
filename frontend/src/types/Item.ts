import { User } from "./User";
import { Wishlist } from "./Wishlist";

export type Items = {
  [key: string]: Item[];
};
export type ItemWishList = {
  userID: number;
  itemID: number;
  wishlistID: number;
  attributed: number;
  attributedBy: User;
  attributedDate: string;
  user: User;
  wishlist: Wishlist;
};
export type Item = {
  name: string;
  image: string;
  raidMode: string;
  id: number;
  itemID: number;
  slot: string;
  quality: string;
  ilvl: number;
  bossID: number;
  raidSize: number;
  wishlists: ItemWishList[];
};

export const Quality = [
  { value: "poor", label: "Poor", color: "#9d9d9d" },
  { value: "common", label: "Common", color: "#ffffff" },
  { value: "uncommon", label: "Uncommon", color: "#1eff00" },
  { value: "rare", label: "Rare", color: "#0070dd" },
  { value: "epic", label: "Épique", color: "#a335ee" },
  { value: "legendary", label: "Legendary", color: "#ff8000" },
  { value: "artifact", label: "Artifact", color: "#e6cc80" },
];

export function getQualityColor(quality: string) {
  const find = Quality.find((q) => q.label === quality);
  return find ? find.color : "#ffffff";
}
