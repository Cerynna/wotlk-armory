export type ItemDBType = {
  itemId: number;
  icon: string;
  quality: string;
  contentPhase: number;
  name: string;
  description: string;
  itemLevel: number;
  itemLink: string;
  requiredLevel: number;
  sellPrice: number;
  slot: string;
  subSlot: string;
  uniqueName: string;
  tooltip: [{ label: string; format?: string }];
  id: number;
  enchant?: number | null;
  gems: number[] | null;
};

/* {
  class : "Armor",
  contentPhase: 1;
  icon: "https://render-classic-us.worldofwarcraft.com/icons/56/inv_helmet_108.jpg",
  itemId: 40304;
  itemLevel: 213;
  itemLink: "|cffa335ee|Hitem:40304::::::::::0|h[Headpiece of Fungal Bloom]|h|r";
  name: "Headpiece of Fungal Bloom";
  quality: "Epic";
  requiredLevel: 80;
  sellPrice: 80353;
  slot: "Head";
  subclass: "Leather";
  uniqueName: "headpiece-of-fungal-bloom";
} */

export type ItemType = {
  id: number;
  enchant?: number | null;
  gems?: number[] | null;
};
