import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getBossByTag } from "../services/Bosses";

export default function ListLootBoss({ tag }: { tag: string }) {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    max-height: 59vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

  const RaidMode = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 50%;
    gap: 0.5rem;
  `;
  const BossItem = styled.div`
    width: calc(100% - 1rem);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    padding-right: 0.5rem;
    gap: 0.5rem;
    &[datatype="HM"] {
      background-color: rgba(255, 0, 0, 0.8);
    }
  `;
  const BossIcon = styled.div`
    width: 3rem;
    height: 3rem;
    background-image: url(https://wow.zamimg.com/images/wow/icons/large/${(props: {
      url: string;
    }) => props.url}.jpg);
    background-size: cover;
    border-radius: 0.5rem;
    background-position: center;
    background-repeat: no-repeat;
  `;

  type Items = {
    [key: string]: Item[];
  };
  type Item = {
    name: string;
    image: string;
    raidMode: string;
  };
  const inProgress = useRef(false);
  const [items, setItems] = useState<Items | false>(false);
  useEffect(() => {
    if (inProgress.current) {
      return;
    }
    inProgress.current = true;
    let boss = getBossByTag(tag);
    Promise.resolve(boss).then((boss) => {
      setItems(boss.items);
      inProgress.current = false;
      if (!boss.items) return;
    });
  }, [tag]);

  return (
    <Container>
      <RaidMode>
        <h2>Raid 10</h2>
        {items &&
          items["10"].map((item: Item) => {
            return (
              <BossItem datatype={item.raidMode}>
                <BossIcon url={item.image} />
                {item.name}
              </BossItem>
            );
          })}
      </RaidMode>
      <RaidMode>
        <h2>Raid 25</h2>
        {items &&
          items["25"].map((item: Item) => {
            return (
              <BossItem datatype={item.raidMode}>
                <BossIcon url={item.image} />
                {item.name}
              </BossItem>
            );
          })}
      </RaidMode>
    </Container>
  );
}
