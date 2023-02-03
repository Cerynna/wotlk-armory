import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getUsers } from "../services/User";
import { CharacterType, FindClass, WishlistType } from "../types/Character";
import Character from "./Character";
const RosterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: 1rem;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 0.5rem;
`;
export default function Roster() {
  const inProgress = useRef(false);

  const [roster, setRoster] = useState<CharacterType[]>([]);

  useEffect(() => {
    if (inProgress.current) return;
    inProgress.current = true;
    if (roster.length > 0) return;
    getUsers().then((users) => {
      setRoster(users);
      inProgress.current = false;
    });
  });
  return (
    <RosterContainer>
      {roster.map((character) => {
        return <Character character={character} key={character.id} />;
      })}
    </RosterContainer>
  );
}
