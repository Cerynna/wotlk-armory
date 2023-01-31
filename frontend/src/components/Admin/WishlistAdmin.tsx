import { useState } from "react";
import styled from "styled-components";
import {
  deleteWishlist,
  togglevalidateWishlist,
} from "../../services/Wishlist";
import { FindClass } from "../../types/Character";
import { Wishlist } from "../../types/Wishlist";
import Switch from "../Switch";

const WishList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  &[data-validate="true"] {
    background-color: rgba(0, 227, 106, 0.2);
  }
`;
const Name = styled.div`
  color: white;
`;

const Pseudo = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: ${(props: { color: string }) => props.color};
`;
const Who = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: -0.15rem;
`;

const ValidThat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
`;
const Trash = styled.div`
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
  &:hover {
    color: rgba(255, 0, 0, 0.8);
  }
`;

export default function WishlistAdmin({ wishlist }: { wishlist: Wishlist }) {
  const [validate, setValidate] = useState(
    wishlist.validate === 1 ? true : false
  );

  const handdleValidate = async (value: boolean) => {
    setValidate(await togglevalidateWishlist(wishlist.id, value));
  };
  const handleDelete = async (id: number) => {
    await deleteWishlist(id);
    window.location.reload();
  };

  return (
    <WishList  data-validate={validate}>
      <Who>
        <Pseudo color={FindClass(wishlist.user.classe)!.color}>
          {wishlist.user.pseudo}
        </Pseudo>
        <Name>
          {wishlist.name} | {wishlist.items.length} item
          {wishlist.items.length > 1 ? "s" : ""}
        </Name>
      </Who>
      <ValidThat>
        <Switch
          value={validate}
          onChange={async (value: boolean) => {
            handdleValidate(value);
          }}
        />
        <Trash
          onDoubleClick={() => {
            handleDelete(wishlist.id);
          }}
        >
          🗑️
        </Trash>
      </ValidThat>
    </WishList>
  );
}
