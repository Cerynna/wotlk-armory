import { useState } from "react";
import styled from "styled-components";
import { Bosses } from "../types/Boss";
import ListLootBoss from "./ListLootBoss";

export default function WishList() {
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
    gap: 1rem;
    width: 100%;
  `;
  const ListBoss = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.25rem;
  `;
  const BossItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  `;
  const [currentBoss, setCurrentBoss] = useState(Bosses[0].tag);
  return (
    <Container>
      <ListBoss>
        {Bosses.map((boss) => {
          return (
            <BossItem key={boss.name} onClick={() => setCurrentBoss(boss.tag)}>
              <BossIcon url={boss.image} />
            </BossItem>
          );
        })}
      </ListBoss>
      <ListLootBoss tag={currentBoss} />
    </Container>
  );
}
