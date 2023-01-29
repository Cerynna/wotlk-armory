import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getBossByTag } from "../services/Bosses";
import { postAttribItem, postUnAttribItem } from "../services/Wishlist";
import { FindClass } from "../types/Character";
import { getQualityColor, Item, Items, ItemWishList } from "../types/Item";
import { User } from "../types/User";
import useLocalStorage from "../utils/UselocalStorage";
import Switch from "./Switch";
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0.5rem;
  border: 3px solid #ffffff;
  &[datatype="HM"] {
    border: 3px solid #fcc008;
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  border-bottom: 3px solid #ffffff;
  &[datatype="HM"] {
    border-bottom: 3px solid #fcc008;
  }
`;

const ItemIcon = styled.div`
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

const ItemName = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: ${(props: { color: string }) => props.color};
`;

const WhoNeedThat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;
export default function ListLootBoss({ tag }: { tag: string }) {
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

  const raidMode = ["10", "25"];

  return (
    <Container>
      {raidMode.map((mode) => {
        return (
          <RaidMode key={mode}>
            <h2>Raid {mode}</h2>
            {items &&
              items[mode].map((data) => {
                if (data.wishlists.length > 0) {
                  return (
                    <BossItem datatype={data.item.raidMode} key={data.item.itemID}>
                      <Header datatype={data.item.raidMode}>
                        <ItemIcon url={data.item.image} />
                        <ItemName color={getQualityColor(data.item.quality)}>
                          {data.item.name}
                        </ItemName>
                      </Header>
                      <WhoNeedThat>
                        {data.wishlists.map((item) => {
                          return (
                            <IneedThat
                              item={item}
                              key={item.user.pseudo + item.itemID}
                            />
                          );
                        })}
                      </WhoNeedThat>
                    </BossItem>
                  );
                }
              })}
          </RaidMode>
        );
      })}
    </Container>
  );
}
const Pseudo = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: ${(props: { color: string }) => props.color};
`;
const WLName = styled.div`
  font-size: 0.75rem;
`;
const ContainerIneedThat = styled.div`
  display: flex;
  width: calc(100% - 1rem);
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #ffffff;
  padding: 0.5rem;
  position: relative;
  &[datatype="attributed"] {
    &::before {
      font-weight: 600;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      content: "${(props: { textAttributed: string }) => {
        return props.textAttributed;
      }}";
      height: calc(100% - 1rem);
      width: calc(100% - 1rem);
      left: 0;
      bottom: 0;
      background-color: #00000099;
      transition: 0.4s;
      padding: 0.5rem;
    }
  }
`;
const Who = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: -0.15rem;
`;
const AttribThat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25rem;
`;

const IneedThat = ({ item }: { item: ItemWishList }) => {
  const { user, wishlist } = item;

  const [attributed, setAttributed] = useState(
    item.attributed === 1 ? true : false
  );
  const [currentUser] = useLocalStorage<User | false>("user", false);
  const [textAttributed, setTextAttributed] = useState(
    `Attribué par ${item.attributedBy && item.attributedBy.pseudo}`
  );
  const isAdmin = currentUser && currentUser.isAdmin ? true : false;
  const handleAttrib = useCallback(
    async (value: boolean) => {
      if (value) {
        await postAttribItem(item.itemID, item.wishlistID);
        setAttributed(true);
        setTextAttributed(`Attribué par ${currentUser && currentUser.pseudo}`);
      } else {
        await postUnAttribItem(item.itemID, item.wishlistID);
        setAttributed(false);
      }
    },
    [attributed]
  );
  return (
    <ContainerIneedThat
      datatype={attributed ? "attributed" : "unattributed"}
      textAttributed={textAttributed}
    >
      <Who>
        <Pseudo color={FindClass(user.classe)!.color}>{user.pseudo}</Pseudo>
        <WLName>{wishlist.name}</WLName>
      </Who>
      {isAdmin && (
        <AttribThat>
          <Switch
            value={attributed}
            onChange={async (value) => await handleAttrib(value)}
          />
        </AttribThat>
      )}
    </ContainerIneedThat>
  );
};
