export type CharacterType = {
  name: string;
  class: typeof Classes[number];
  wishlist?: WishlistType[];
};
export type WishlistType = {
  items: number[];
  name: string;
};

export const Roles = [
  { name: "Tank", tag: "tank", icon: "🛡" },
  { name: "Healer", tag: "heal", icon: "💉" },
  { name: "DPS", tag: "dps", icon: "⚔️" },
];

export const FindRole = (tag: string) => {
  return Roles.find((r) => r.tag === tag);
};

export const Classes = [
  {
    name: "Warrior",
    value: "warrior",
    specs: ["Arms", "Fury", "Protection"],
    icon: "/classicons/square/warrior_square.png",
    color: "#C79C6E",
  },
  {
    name: "Paladin",
    value: "paladin",
    specs: ["Holy", "Protection", "Retribution"],
    icon: "/classicons/square/paladin_square.png",
    color: "#F58CBA",
  },
  {
    name: "Hunter",
    value: "hunter",
    specs: ["Beast Mastery", "Marksmanship", "Survival"],
    icon: "/classicons/square/hunter_square.png",
    color: "#ABD473",
  },
  {
    name: "Rogue",
    value: "rogue",
    specs: ["Assassination", "Outlaw", "Subtlety"],
    icon: "/classicons/square/rogue_square.png",
    color: "#FFF569",
  },
  {
    name: "Priest",
    value: "priest",
    specs: ["Discipline", "Holy", "Shadow"],
    icon: "/classicons/square/priest_square.png",
    color: "#FFFFFF",
  },
  {
    name: "Death Knight",
    value: "deathknight",
    specs: ["Blood", "Frost", "Unholy"],
    icon: "/classicons/square/deathknight_square.png",
    color: "#C41F3B",
  },
  {
    name: "Shaman",
    value: "shaman",
    specs: ["Elemental", "Enhancement", "Restoration"],
    icon: "/classicons/square/shaman_square.png",
    color: "#0070DE",
  },
  {
    name: "Mage",
    value: "mage",
    specs: ["Arcane", "Fire", "Frost"],
    icon: "/classicons/square/mage_square.png",
    color: "#69CCF0",
  },
  {
    name: "Warlock",
    value: "warlock",
    specs: ["Affliction", "Demonology", "Destruction"],
    icon: "/classicons/square/warlock_square.png",
    color: "#9482C9",
  },
  {
    name: "Druid",
    value: "druid",
    specs: ["Balance", "Feral", "Guardian", "Restoration"],
    icon: "/classicons/square/druid_square.png",
    color: "#FF7D0A",
  },
  /* { name: 'Monk', value: 'monk', specs: ['Brewmaster', 'Mistweaver', 'Windwalker'], icon: "/classicons/square/monk_square.png" }, */
  /* { name: 'Demon Hunter', value: 'demonhunter', specs: ['Havoc', 'Vengeance'], icon: "/classicons/square/demonhunter_square.png" }, */
];

export const FindClass = (name: string) => {
  return Classes.find((c) => c.value === name);
};
