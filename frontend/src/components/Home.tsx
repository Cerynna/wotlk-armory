import { useState } from "react";
import styled from "styled-components";
import { User } from "../types/User";
import useLocalStorage from "../utils/UselocalStorage";
import Admin from "./Admin";
import Profil from "./Profil";
import Roster from "./Roster";
import WishList from "./WishList";
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 500px;
  margin-bottom: 1rem;
`;
const NavLink = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
export default function Home() {
  const [path, setPath] = useState("/profil");
  const [user] = useLocalStorage<User | false>("user", false);
  const isAdmin = user && user.isAdmin ? true : false;
  return (
    <>
      <Nav>
        <NavLink onClick={() => setPath("/roster")}>🐓</NavLink>
        <NavLink onClick={() => setPath("/wishlist")}>📒</NavLink>
        {isAdmin && <NavLink onClick={() => setPath("/admin")}>👑</NavLink>}
        <NavLink onClick={() => setPath("/profil")}>🎀</NavLink>
      </Nav>
      {path === "/roster" && <Roster />}
      {path === "/wishlist" && <WishList />}
      {path === "/profil" && <Profil />}
      {path === "/admin" && <Admin />}
    </>
  );
}
