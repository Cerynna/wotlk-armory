import { useState } from "react";
import styled from "styled-components";
import { BossType } from "../types/Boss";
import useLocalStorage from "../utils/UselocalStorage";
import ListLootBoss from "./ListLootBoss";
const BossIcon = styled.div`
  width: 4.7rem;
  height: 3rem;
  background-image: url(${(props: { url: string }) => props.url});
  background-size: cover;
  border-radius: 0.5rem;
  background-position: center;
  background-repeat: no-repeat;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1rem;
  width: calc(100% - 2rem);
  color: white;
`;
const ListBoss = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
`;
const Boss = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
    transform: scale(1.05);
  }
  &[data-active="true"] {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid white;
  }
`;
export default function WishList() {
  const [Bosses] = useLocalStorage<BossType[]>("Bosses", []);
  const [currentBoss, setCurrentBoss] = useLocalStorage<string>(
    "currentBoss",
    Bosses[0].tag
  );
  return (
    <Container>
      <ListBoss>
        {Bosses.map((boss) => {
          return (
            <Boss
              key={boss.name}
              onClick={() => setCurrentBoss(boss.tag)}
              data-active={currentBoss === boss.tag ? true : false}
            >
              {<BossIcon url={boss.image} />}
            </Boss>
          );
        })}
      </ListBoss>
      <ListLootBoss tag={currentBoss} />
    </Container>
  );
}
