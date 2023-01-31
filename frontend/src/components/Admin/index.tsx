import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getWishlists } from "../../services/Wishlist";
import { FindClass } from "../../types/Character";
import { Wishlist } from "../../types/Wishlist";
import LoadingSpinner from "../LoadingSpinner";
import Switch from "../Switch";
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

export default function Admin() {
  const [wishlists, setWishlists] = useState<Wishlist[] | false>(false);
  const inProgress = useRef(false);

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
  });
  if (!wishlists) return <LoadingSpinner />;
  return (
    <Container>
      <H3>WishList</H3>
      {wishlists.map((wishlist) => {
        return <WishlistAdmin wishlist={wishlist} key={"wl-admin" + wishlist.id} />;
      })}
    </Container>
  );
}
