import { useRef, useState } from "react";
import styled from "styled-components";
import {
  deleteWishlist,
  postChangeName,
  togglevalidateWishlist,
} from "../../services/Wishlist";
import { FindClass } from "../../types/Character";
import { getQualityColor } from "../../types/Item";
import { Wishlist } from "../../types/Wishlist";
import StyledInput from "../Input";
import Switch from "../Switch";
import RowItem from "./RowItem";

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
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  &[data-validate="true"] {
    background-color: rgba(0, 227, 106, 0.2);
  }
`;
const Name = styled.div`
  cursor: pointer;
  color: white;
`;

const Pseudo = styled.div`
  width: 10rem;
  font-weight: 700;
  font-size: 1rem;
  color: ${(props: { color: string }) => props.color};
  text-transform: capitalize;
`;
const Who = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
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

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  width: calc(100% - 1rem);
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
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

  const [toggleList, setToggleList] = useState(false);

  const refInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <WishList data-validate={validate}>
        <Who>
          <Name
            onClick={() => {
              setToggleList(!toggleList);
            }}
          >
            {toggleList ? "👆" : "👇"}
          </Name>
          <Pseudo color={FindClass(wishlist.user.classe)!.color}>
            {wishlist.user.pseudo}
          </Pseudo>
          <StyledInput
            value={wishlist.name}
            refInput={refInput}
            onBlur={() => {
              postChangeName(wishlist.id, refInput.current!.value);
            }}
          />
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
      {toggleList && (
        <ListItem>
          {wishlist.items.map((item) => {
            if (!item) return false;

            return <RowItem item={item} key={item.id} />;
          })}
        </ListItem>
      )}
    </>
  );
}
