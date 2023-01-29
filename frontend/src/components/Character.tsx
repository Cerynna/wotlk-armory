import { useState } from "react";
import styled from "styled-components";
import { CharacterType } from "../types/Character";
const Container = styled.div`
  width: ${(props: { isOpen: boolean }) => (props.isOpen ? "200px" : "200px")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  padding-right: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  padding-bottom: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "1rem" : "0"};
  &:hover {
    transform: scale(1.05);
  }
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
export default function Character({ character }: { character: CharacterType }) {
  const [open, setOpen] = useState(false);
  return (
    <Container
      isOpen={open}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Header>
        <ClassIcon url={`/assets${character.class.icon}`} />

        <Name color={character.class.color}>{character.name}</Name>
      </Header>
      {open && (
        <WishList>
          <H3>Wishlist :</H3>
          <ul>
            {character.wishlist!.map((wishlist) => {
              return <li>{wishlist.name}</li>;
            })}
          </ul>
        </WishList>
      )}
    </Container>
  );
}
