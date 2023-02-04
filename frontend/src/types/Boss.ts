import { Items } from "./Item";

export type BossType = {
  id: number;
  name: string;
  image: string;
  tag: string;
  items: Items;
};
