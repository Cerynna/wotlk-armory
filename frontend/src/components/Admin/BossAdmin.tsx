import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  addItemToBoss,
  deleteItem,
  getItemFromWoWHead,
} from "../../services/Admin";
import { getBossByTag } from "../../services/Bosses";
import { BossType } from "../../types/Boss";
import { Item } from "../../types/Item";
import StyledButton from "../Button";
import StyledInput from "../Input";
import Select from "../Select";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1rem;
  width: calc(100% - 2rem);
  color: white;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Boss = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const NameBoss = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const H2 = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
`;

const Loot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: calc(100% - 1rem);
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
const ItemIcon = styled.div`
  min-width: 2rem;
  min-height: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  background-image: url(https://wow.zamimg.com/images/wow/icons/large/${(props: {
    url: string;
  }) => props.url}.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ItemName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

const ItemTrash = styled.div`
  min-width: 2rem;
  min-height: 2rem;
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

const ItemValid = styled.div`
  min-width: 2rem;
  min-height: 2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-radius: 0.5rem;
  &:hover {
    background-color: rgba(0, 255, 0, 0.2);
  }
`;

const AddItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: calc(100% - 1rem);
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export default function BossAdmin({ bosses }: { bosses: BossType[] }) {
  const [currentBoss, setCurrentBoss] = useState<string>(bosses[0].tag);
  const [boss, setBoss] = useState<BossType | false>(false);

  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const [item, setItem] = useState<any | false>(false);

  const refAddItemID = useRef<HTMLInputElement>(null);
  const [addSizeMode, setAddSizeMode] = useState<string>("10-HM");

  useEffect(() => {
    getBossByTag(currentBoss).then((boss) => {
      console.log("boss", boss);
      setBoss(boss);
    });
  }, [currentBoss]);
  const raidMode = ["10", "25"];
  return (
    <Container>
      <Header>
        {bosses.map((boss) => {
          return (
            <StyledButton
              key={"boss-admin" + boss.name}
              onClick={() => setCurrentBoss(boss.tag)}
              label={boss.name}
            />
          );
        })}
      </Header>
      {boss && (
        <Boss>
          <NameBoss>
            {boss.name}{" "}
            <StyledButton
              label="Add"
              onClick={() => {
                setToggleAdd(!toggleAdd);
              }}
            />
          </NameBoss>
          {toggleAdd && (
            <div>
              <StyledInput
                label="Item ID"
                refInput={refAddItemID}
                onChange={async () => {
                  if (!refAddItemID.current) return;
                  if (refAddItemID.current.value.length < 3) return;
                  if (isNaN(Number(refAddItemID.current.value))) return;

                  let itemWH = await getItemFromWoWHead(
                    refAddItemID.current!.value
                  );
                  let item = {
                    itemID: refAddItemID.current!.value,
                    name: itemWH.name,
                    image: itemWH.icon,
                    slot: itemWH.inventorySlot,
                    quality: itemWH.quality,
                    ilvl: itemWH.level,
                    bossID: boss.id,
                    raidSize: 10,
                    raidMode: "HM",
                  };
                  console.log(item);
                  if (!item) return;
                  setItem(item);
                  setToggleAdd(false);
                }}
              />
            </div>
          )}
          {item && (
            <AddItem>
              <ItemIcon url={item.image} />
              <ItemName>{item.name}</ItemName>
              <Select
                options={[
                  { value: "10-NM", label: "10 NM", color: "#fff" },
                  { value: "10-HM", label: "10 HM", color: "#fcc008" },
                  { value: "25-NM", label: "25 NM", color: "#fff" },
                  { value: "25-HM", label: "25 HM", color: "#fcc008" },
                ]}
                value={addSizeMode}
                onChange={(value) => {
                  /* refSizeMode.current!.value = value; */
                  setAddSizeMode(value);
                }}
              />

              <ItemValid
                children="✔️"
                onClick={async () => {
                  if (!item) return;
                  await addItemToBoss(boss.tag, item, addSizeMode);
                  setItem(false);
                }}
              />
              <ItemTrash
                children="❌"
                onClick={() => {
                  setItem(false);
                }}
              />
            </AddItem>
          )}
          {raidMode.map((mode) => {
            return (
              <>
                <H2>Raid {mode} :</H2>
                {boss.items[mode].map((item) => {
                  return (
                    <Loot>
                      <ItemIcon url={item.item.image} />
                      <ItemName>
                        {item.item.itemID} - {item.item.name}
                      </ItemName>
                      <ItemTrash
                        onDoubleClick={async () => {
                          deleteItem(item.item.id);
                        }}
                      >
                        🗑️
                      </ItemTrash>
                    </Loot>
                  );
                })}
              </>
            );
          })}
        </Boss>
      )}
    </Container>
  );
}
