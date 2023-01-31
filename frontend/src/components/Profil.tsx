import { random } from "lodash";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { whoiam } from "../services/Auth";
import { getItemById } from "../services/Item";
import { postWishlist } from "../services/Wishlist";
import { BossType } from "../types/Boss";
import { FindClass, FindRole } from "../types/Character";
import { Item } from "../types/Item";
import { isJson } from "../utils/Tools";
import StyledButton from "./Button";
import StyledInput from "./Input";
import ItemExport from "./ItemExport";
import LoadingSpinner from "./LoadingSpinner";
import Tutorial from "./Tutorial";

type ItemWishlist = {
  userID: number;
  itemID: number;
  wishlistID: number;
  attributed: number;
  attributedBy: number;
  attributedDate: string;
  item: Item;
  boss: BossType;
};
type WishList = {
  name: string;
  items: ItemWishlist[];
  validate: number;
};
type User = {
  pseudo: string;
  classe: string;
  role: string;
  isAdmin: boolean;
  wishlists: WishList[];
};
const ClassIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background-image: url(${(props: { url: string }) => props.url});
  background-size: cover;
  border-radius: 0.5rem;
`;

const Pseudo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props: { color: string }) => props.color};
`;
const Role = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 50vw;
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
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem;
`;
const ListExport = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25rem;
`;

const ListWishlist = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;
export default function Profil() {
  async function parse80Upgrade(text: string) {
    const data = JSON.parse(text);
    const { items } = data;
    return Promise.all(
      items.map((item: any) => {
        return getItemById(item.id);
      })
    );
  }

  const [buzy, setBuzy] = useState(false);
  const [wishlist, setwishlist] = useState<Item[] | false>(false);
  const refNameWishlist = useRef<HTMLInputElement>(null);
  const inProgress = useRef(false);
  const [user, setUser] = useState<User | false>(false);
  const [currentWL, setCurrentWL] = useState<string | false>(false);

  const [tutorial, setTutorial] = useState(false);

  const showWishlist = async (wishlist: WishList) => {
    setCurrentWL(wishlist.name);
    setBuzy(true);
    setwishlist(
      wishlist.items.map((itemWishlist) => {
        return {
          ...itemWishlist.item,
          boss: itemWishlist.boss,
          attributed: itemWishlist.attributed,
          attributedBy: itemWishlist.attributedBy,
          attributedDate: itemWishlist.attributedDate,
        };
      })
    );
    setBuzy(false);
    setTutorial(false);
  };

  useEffect(() => {
    if (inProgress.current) {
      return;
    }
    inProgress.current = true;
    Promise.resolve(whoiam()).then((user) => {
      if (!user) return;
      setUser(user);
      inProgress.current = false;
      if (!user) return;
    });
  }, []);

  if (!user) return <LoadingSpinner />;
  const currentClass = FindClass(user.classe);
  const currentRole = FindRole(user.role);

  return (
    <Container>
      <Header>
        <ClassIcon url={`/assets${currentClass!.icon}`} />
        <Row>
          <Pseudo color={currentClass!.color}>{user.pseudo}</Pseudo>

          <Role>{currentRole?.icon}</Role>
        </Row>
      </Header>
      <H3>WishList</H3>
      {buzy && <LoadingSpinner />}
      <ListWishlist>
        {user.wishlists.map((wishlist: WishList) => {
          const name = `${wishlist.validate === 1 ? "✅" : "⏳"} ${
            wishlist.name
          }`;
          return (
            <StyledButton
              key={wishlist.name}
              label={name}
              onClick={async () => {
                showWishlist(wishlist);
              }}
            />
          );
        })}
        <StyledButton
          label="✍️"
          onClick={() => {
            const clipboardContent = navigator.clipboard.readText();
            clipboardContent.then(async (text) => {
              setTutorial(false);
              setwishlist(false);
              if (text && isJson(text)) {
                setwishlist(await parse80Upgrade(text));
                refNameWishlist.current?.focus();
              } else {
                setTutorial(true);
              }
            });
          }}
        />
      </ListWishlist>
      {!buzy && (
        <ListExport>
          {wishlist && (
            <>
              <StyledInput
                refInput={refNameWishlist}
                placeholder="Choisie un nom"
                value={currentWL ? currentWL : ""}
                disabled={currentWL ? true : false}
              />
              {wishlist.map((item: Item) => {
                return <ItemExport item={item} />;
              })}
              {!currentWL && (
                <StyledButton
                  label={"Valider"}
                  onClick={async () => {
                    if (!refNameWishlist.current?.value)
                      return alert("Nom de la liste manquant");

                    setBuzy(true);
                    let result = await postWishlist(
                      wishlist,
                      refNameWishlist.current?.value ?? "NO NAME LISTE"
                    );

                    if (result) {
                      setwishlist(false);
                      setBuzy(false);
                      setUser(await whoiam());
                    } else {
                      setBuzy(false);
                    }
                  }}
                />
              )}
            </>
          )}
        </ListExport>
      )}

      {tutorial && <Tutorial />}
    </Container>
  );
}
