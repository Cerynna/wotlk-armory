import { useState } from "react";
import styled from "styled-components";
import { postBeAdmin } from "../services/User";
import { CharacterType, FindClass } from "../types/Character";
import { isAdmin } from "../utils/Tools";
import Switch from "./Switch";
const Container = styled.div`
  width: ${(props: { isOpen: boolean }) => (props.isOpen ? "200px" : "200px")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "rgba(0, 0, 0, 0.8)" : "rgba(107, 107, 107, 0.8)"};
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
  padding-right: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  padding-bottom: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "1rem" : "0"};
  user-select: none;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;
const WishList = styled.div`
  overflow: scroll;
  color: white;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ClassIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${(props: { url: string }) => props.url});
  background-size: cover;
  border-radius: 0.5rem;
`;
const Name = styled.div`
  font-size: 1rem;
  color: ${(props) => props.color};
`;
const H3 = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid white;
`;
const IsAdmin = styled.div`
  width: calc(100% - 1rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid white;
`;

export default function Character({ character }: { character: CharacterType }) {
  const [open, setOpen] = useState(false);
  let currentClass = FindClass(character.classe);
  return (
    <Container
      isOpen={open}
      onDoubleClick={() => {
        setOpen(!open);
      }}
    >
      <Header>
        <ClassIcon url={`/assets${currentClass.icon}`} />

        <Name color={currentClass.color}>{character.pseudo}</Name>
      </Header>
      {open && (
        <WishList>
          <H3>Wishlist :</H3>
          <ul>
            {character.wishlists!.map((wishlist) => {
              return <li key={wishlist.name}>{wishlist.name}</li>;
            })}
          </ul>
        </WishList>
      )}
      {open && isAdmin() && character.pseudo !== "Hystérias" && (
        <IsAdmin>
          <span>Admin</span>
          <Switch
            value={character.isAdmin}
            onChange={() => {
              postBeAdmin(character.id);
            }}
          />
        </IsAdmin>
      )}
    </Container>
  );
}
