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
  border-radius: 0.5rem;
  &[data-attribued="true"] {
    background-color: rgba(0, 227, 106, 0.2);
  }
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
const ItemBoss = styled.div`
  width: 220px;
  font-size: 1rem;
  color: #ffffff;
`;
const ItemMode = styled.div`
  font-size: 1rem;
  color: #ffffff;
`;
const IconAttributed = styled.div`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ItemExport({ item }: { item: Item }) {
  if (!item.id) return <></>;
  return (
    <Container key={item.id}>
      <ItemContainer data-attribued={item.attributed === 1 ? true : false}>
        <ItemHeader>
          {item.boss && (
            <>
              <IconAttributed>
                {item.attributed === 1 ? "✔️" : ""}
              </IconAttributed>
              <ItemMode>
                {item.raidSize}
                {item.raidMode}
              </ItemMode>
              <ItemBoss>{item.boss!.name}</ItemBoss>
            </>
          )}

          <ItemIcon url={item.image} />
          <ItemName quality={item.quality}>{item.name}</ItemName>
        </ItemHeader>
      </ItemContainer>
    </Container>
  );
}
