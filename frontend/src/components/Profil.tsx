import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { createProfile, whoiam } from "../services/Auth";
import { getItemById } from "../services/Item";
import { postWishlist } from "../services/Wishlist";
import { BossType } from "../types/Boss";
import { Classes, FindClass, FindRole } from "../types/Character";
import { Item } from "../types/Item";
import { isJson } from "../utils/Tools";
import StyledButton from "./Button";
import StyledInput from "./Input";
import ItemExport from "./ItemExport";
import LoadingSpinner from "./LoadingSpinner";
import Select from "./Select";
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
  login: string;
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
  color: white;
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
`;
const TextCreatePerso = styled.div`
  text-align: center;
`;
const H2 = styled.h2`
  font-size: 1.25rem;
  padding-bottom: 0.5rem;
`;
const SpanLogin = styled.span`
  font-size: 1.5rem;
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
  const [user, setUser] = useState<User | false>(false);
  const [tutorial, setTutorial] = useState(false);
  const [currentWL, setCurrentWL] = useState<string | false>(false);
  const [selectClass, setSelectClass] = useState<string | false>(false);

  const refNameWishlist = useRef<HTMLInputElement>(null);
  const inProgress = useRef(false);
  const refInputPseudo = useRef<HTMLInputElement>(null);
  const refInputClass = useRef<HTMLSelectElement>(null);
  const refInputRole = useRef<HTMLSelectElement>(null);

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
      {user.classe == null ? (
        <>
          <TextCreatePerso>
            <H2>
              Bienvenue <SpanLogin>{user.login}</SpanLogin> !
            </H2>
            Il te faut crée ton personnage <br />
            pour pouvoir utiliser la wishlist.
          </TextCreatePerso>
          <SelectPseudo refInput={refInputPseudo} defaultValue={user.login} />
          <SelectClass
            refInput={refInputClass}
            onChange={(value) => {
              setSelectClass(value);
            }}
          />
          {selectClass && (
            <SelectRole
              refInput={refInputRole}
              selectClass={refInputClass.current!.value}
            />
          )}
          <StyledButton
            label={"Valider"}
            size={"large"}
            onClick={async () => {
              if (!refInputPseudo.current?.value)
                return alert("Pseudo manquant");
              if (!refInputClass.current?.value)
                return alert("Classe manquante");
              if (!refInputRole.current?.value) return alert("Role manquant");

              let result = await createProfile(
                refInputPseudo.current?.value,
                refInputClass.current?.value,
                refInputRole.current?.value
              );
              if (result) {
                setUser(await whoiam());
              }
            }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
}

export const SelectClass = ({
  refInput,
  onChange,
}: {
  refInput: React.RefObject<HTMLSelectElement>;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState("");
  return (
    <Select
      options={[
        { label: "", value: "", color: "#FFF" },
        ...Classes.map((classe) => {
          return {
            label: classe.name,
            value: classe.value,
            color: classe.color,
          };
        }),
      ]}
      value={value}
      refInput={refInput}
      onChange={(value) => {
        onChange(value);
        setValue(value);
      }}
    />
  );
};

export const SelectPseudo = ({
  refInput,
  defaultValue,
}: {
  refInput: React.RefObject<HTMLInputElement>;
  defaultValue?: string;
}) => {
  return (
    <StyledInput
      placeholder="Pseudo"
      refInput={refInput}
      label={"Choisie ton pseudo"}
      value={defaultValue}
    />
  );
};

export const SelectRole = ({
  refInput,
  selectClass,
}: {
  refInput: React.RefObject<HTMLSelectElement>;
  selectClass: string;
}) => {
  const [value, setValue] = useState(FindClass(selectClass).specs[0]);
  return (
    <Select
      options={FindClass(selectClass).specs.map((spec) => {
        return { label: spec, value: spec, color: "#FFF" };
      })}
      value={value}
      refInput={refInput}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
};
