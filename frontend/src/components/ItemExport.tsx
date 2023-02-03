import { useRef } from "react";
import styled from "styled-components";
import { deleteItemWishlist } from "../services/Wishlist";
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
  padding: 0.25rem 1rem;
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
const IconTrash = styled.div`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-radius: 0.5rem;
  &:hover {
    background-color: rgba(255, 0, 0, 0.2);
  }
`;

export default function ItemExport({ item }: { item: Item }) {
  const refItem = useRef<HTMLDivElement>(null);
  if (!item.bossID) return <></>;
  return (
    <Container key={item.id} ref={refItem}>
      <ItemContainer data-attribued={item.attributed === 1 ? true : false}>
        <ItemHeader>
          {item.boss && (
            <>
              <IconTrash
                onDoubleClick={async () => {
                  let response = await deleteItemWishlist(
                    item.userID,
                    item.itemID
                  );
                  console.log(response);
                  if (response) {
                    refItem.current?.remove();
                  }
                }}
              >
                🗑️
              </IconTrash>
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
