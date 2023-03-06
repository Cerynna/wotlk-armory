import { useRef, useState } from "react";
import styled from "styled-components";
import { postBeAdmin } from "../services/User";
import { CharacterType, FindClass } from "../types/Character";
import { isAdmin } from "../utils/Tools";
import Switch from "./Switch";
import StyledInput from "./Input";

import { SelectClass, SelectRole } from "./Profil";
import StyledButton from "./Button";
import { createProfile, editProfile } from "../services/Auth";

const Container = styled.div`
  width: ${(props: { isOpen: boolean }) => (props.isOpen ? "200px" : "200px")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "rgba(0, 0, 0, 0.8)" : "rgba(107, 107, 107, 0.8)"};
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
  padding-right: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  padding-bottom: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "1rem" : "0"};
  user-select: none;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 100%;
`;
const WishList = styled.div`
  overflow: scroll;
  color: white;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ClassIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${(props: { url: string }) => props.url});
  background-size: cover;
  border-radius: 0.5rem;
`;
const Name = styled.div`
  text-transform: capitalize;
  font-size: 1rem;
  color: ${(props) => props.color};
`;
const H3 = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid white;
`;
const IsAdmin = styled.div`
  width: calc(100% - 1rem);
  display: flex;
  flex-direction: column;
  align-items: flaex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid white;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
`;

export default function Character({ character }: { character: CharacterType }) {
  const [open, setOpen] = useState(false);
  const [stateCharacter, setStateCharacter] =
    useState<CharacterType>(character);
  let currentClass = FindClass(stateCharacter.classe);
  const refPseudo = useRef<HTMLInputElement>(null);
  const refInputClass = useRef<HTMLSelectElement>(null);
  const refInputRole = useRef<HTMLSelectElement>(null);
  const [selectClass, setSelectClass] = useState<string | false>(
    stateCharacter.classe
  );
  if (!stateCharacter.pseudo) return null;
  return (
    <Container isOpen={open}>
      <Header>
        <ClassIcon url={`/assets${currentClass.icon}`} />

        <Name color={currentClass.color}>{stateCharacter.pseudo}</Name>

        <span
          onClick={() => {
            if (isAdmin()) setOpen(!open);
          }}
          children={open ? "👆" : "👇"}
        />
      </Header>
      {open && isAdmin() && (
        <IsAdmin>
          <Row>
            Admin :
            <Switch
              value={stateCharacter.isAdmin}
              onChange={() => {
                postBeAdmin(stateCharacter.id);
              }}
            />
          </Row>

          <StyledInput
            refInput={refPseudo}
            label={"Pseudo"}
            value={stateCharacter.pseudo}
          />
          <SelectClass
            refInput={refInputClass}
            defaultValue={stateCharacter.classe}
            onChange={(value) => {
              setSelectClass(value);
            }}
          />
          {selectClass && (
            <SelectRole refInput={refInputRole} selectClass={selectClass} />
          )}
          <StyledButton
            label={"Valider"}
            size={"large"}
            onClick={async () => {
              if (!refPseudo.current?.value) return alert("Pseudo manquant");
              if (!refInputClass.current?.value)
                return alert("Classe manquante");
              if (!refInputRole.current?.value) return alert("Role manquant");

              let result = await editProfile(
                character.id,
                refPseudo.current?.value,
                refInputClass.current?.value,
                refInputRole.current?.value
              );
              /* character = result; */
              setStateCharacter(result);
            }}
          />
        </IsAdmin>
      )}
    </Container>
  );
}
