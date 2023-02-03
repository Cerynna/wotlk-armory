import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { getWishlists } from "../../services/Wishlist";
import { getBosses } from "../../services/Bosses";
import { BossType } from "../../types/Boss";
import { Wishlist } from "../../types/Wishlist";
import useLocalStorage from "../../utils/UselocalStorage";
import StyledButton from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import WishlistAdmin from "./WishlistAdmin";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 0.25rem;
  width: calc(100% - 2rem);
  color: white;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export default function Admin() {
  const [wishlists, setWishlists] = useState<Wishlist[] | false>(false);
  const [bosses, setBosses] = useState<false | BossType[]>(false);
  const inProgress = useRef(false);
  const [path, setPath] = useLocalStorage<string>("pathAdmin", "wishlist");
  useEffect(() => {
    if (inProgress.current) {
      return;
    }
    if (wishlists) return;
    inProgress.current = true;
    Promise.resolve(getWishlists()).then((wishlists) => {
      setWishlists(wishlists);
      inProgress.current = false;
      if (!wishlists) return;
    });
  }, [wishlists, setWishlists]);

  useEffect(() => {
    if (inProgress.current) {
      return;
    }
    if (bosses) return;
    inProgress.current = true;
    Promise.resolve(getBosses()).then((bosses) => {
      setBosses(bosses);
      inProgress.current = false;
      if (!bosses) return;
    });
  }, [bosses, setBosses]);

  if (!wishlists) return <LoadingSpinner />;
  return (
    <Container>
      <Header>
        <StyledButton label="WishList" onClick={() => setPath("wishlist")} />
        <StyledButton label="Boss" onClick={() => setPath("bosses")} />
        <StyledButton label="Item" onClick={() => setPath("items")} />
      </Header>
      {path == "wishlist" &&
        wishlists.map((wishlist) => {
          return (
            <WishlistAdmin wishlist={wishlist} key={"wl-admin" + wishlist.id} />
          );
        })}
    </Container>
  );
}
