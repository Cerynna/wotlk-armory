import { useCallback, useState } from "react";
import styled from "styled-components";
import { postAttribItem, postUnAttribItem } from "../../services/Wishlist";
import { getQualityColor, Item } from "../../types/Item";
import Switch from "../Switch";

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;
const ItemContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const ItemIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(https://wow.zamimg.com/images/wow/icons/large/${(props: {
    url: string;
  }) => props.url}.jpg);
  background-size: cover;
  border-radius: 0.5rem;
  background-position: center;
  background-repeat: no-repeat;
`;
const ItemName = styled.div`
  color: ${(props: { quality: string }) => {
    return getQualityColor(props.quality);
  }};
  font-weight: 700;
  font-size: 1rem;
`;

const BossName = styled.div`
  width: 250px;
  font-size: 1rem;
  color: #ffffff;
`;

export default function RowItem({ item }: { item: Item }) {
  const [attributed, setAttributed] = useState<boolean>(
    item.attributed === 1 ? true : false
  );
  const handleAttrib = useCallback(
    async (value: boolean) => {
      if (value) {
        await postAttribItem(item.itemID, item.wishlistID);
        setAttributed(true);
      } else {
        await postUnAttribItem(item.itemID, item.wishlistID);
        setAttributed(false);
      }
    },
    [attributed]
  );
  return (
    <Row>
      <Switch
        value={attributed}
        onChange={async (value) => await handleAttrib(value)}
      />
      <ItemContainer
        href={`https://www.wowhead.com/wotlk/fr/item=${item.itemID}`}
        target={"_blank"}
      >
        <ItemIcon url={item.image} />
        <ItemName quality={item.quality} children={item.name} />
      </ItemContainer>
      <BossName>{item.boss!.name}</BossName>
    </Row>
  );
}
