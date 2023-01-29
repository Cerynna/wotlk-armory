import styled from "styled-components";
import { CharacterType, FindClass, WishlistType } from "../types/Character";
import Character from "./Character";
const RosterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: 1rem;
  align-items: flex-start;
  justify-content: center;
`;
export default function Roster() {
  const defaultWL = {
    items: [
      45297, 45297, 45297, 45297, 45297, 45297, 45297, 45297, 45297, 45297,
      45297, 45297, 45297, 45297,
    ],
    name: "defaulWL",
  } as WishlistType;
  const JSONRoster = [
    {
      name: "Hystérias",
      class: FindClass("druid"),
      wishlist: [defaultWL, defaultWL],
    } as CharacterType,
    {
      name: "Aphynaroth",
      class: FindClass("warlock"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Byol",
      class: FindClass("priest"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Hîno",
      class: FindClass("rogue"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Seyrox",
      class: FindClass("paladin"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Aeth",
      class: FindClass("deathknight"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Disco",
      class: FindClass("priest"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Nimbex",
      class: FindClass("priest"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Zaelynn",
      class: FindClass("shaman"),
      wishlist: [defaultWL],
    } as CharacterType,
    {
      name: "Vigmundur",
      class: FindClass("warrior"),
      wishlist: [defaultWL],
    } as CharacterType,
  ];

  return (
    <RosterContainer>
      {JSONRoster.map((character) => {
        return <Character character={character} />;
      })}
    </RosterContainer>
  );
}
