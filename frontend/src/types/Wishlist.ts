import { Item } from "./Item";
import { User } from "./User";

export type Wishlist = {
  id: number;
  userID: number;
  name: string;
  validate: number;
  user: User;
  items: Item[];
};
