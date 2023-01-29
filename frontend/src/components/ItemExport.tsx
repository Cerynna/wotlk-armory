import styled from "styled-components";
import { getQualityColor, Item } from "../types/Item";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
`;
const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
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
export default function ItemExport({ item }: { item: Item | number }) {
  if (typeof item === "number") {
    return <></>;
  }
  if (!item) return <></>;

  return (
    <Container key={item.id}>
      <ItemContainer>
        <ItemHeader>
          <ItemIcon url={item.image} />
          <ItemName quality={item.quality}>
            {item.name}
            {item.bossID}
          </ItemName>
        </ItemHeader>
      </ItemContainer>
    </Container>
  );
}
