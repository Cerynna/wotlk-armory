export type CharacterType = {
  id: number;
  pseudo: string;
  classe: string;
  wishlists?: WishlistType[];
  isAdmin: boolean;
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
    name: "Guerrier",
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
    name: "Chasseur",
    value: "hunter",
    specs: ["Beast Mastery", "Marksmanship", "Survival"],
    icon: "/classicons/square/hunter_square.png",
    color: "#ABD473",
  },
  {
    name: "Voleur",
    value: "rogue",
    specs: ["Assassination", "Outlaw", "Subtlety"],
    icon: "/classicons/square/rogue_square.png",
    color: "#FFF569",
  },
  {
    name: "Prètre",
    value: "priest",
    specs: ["Discipline", "Holy", "Shadow"],
    icon: "/classicons/square/priest_square.png",
    color: "#FFFFFF",
  },
  {
    name: "Chevalier de la mort",
    value: "deathknight",
    specs: ["Blood", "Frost", "Unholy"],
    icon: "/classicons/square/deathknight_square.png",
    color: "#C41F3B",
  },
  {
    name: "Chaman",
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
    name: "Démoniste",
    value: "warlock",
    specs: ["Affliction", "Demonology", "Destruction"],
    icon: "/classicons/square/warlock_square.png",
    color: "#9482C9",
  },
  {
    name: "Druide",
    value: "druid",
    specs: ["Balance", "Feral", "Guardian", "Restoration"],
    icon: "/classicons/square/druid_square.png",
    color: "#FF7D0A",
  },
  /* { name: 'Monk', value: 'monk', specs: ['Brewmaster', 'Mistweaver', 'Windwalker'], icon: "/classicons/square/monk_square.png" }, */
  /* { name: 'Demon Hunter', value: 'demonhunter', specs: ['Havoc', 'Vengeance'], icon: "/classicons/square/demonhunter_square.png" }, */
].sort((a, b) => a.name.localeCompare(b.name));

export const FindClass = (name: string) => {
  return Classes.find((c) => c.value === name) || Classes[0];
};
