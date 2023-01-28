import { useState } from "react";
import styled from "styled-components";
import Profil from "./Profil";
import Roster from "./Roster";
import WishList from "./WishList";

export default function Home() {
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

  const [path, setPath] = useState("/profil");
  return (
    <>
      <Nav>
        <NavLink onClick={() => setPath("/roster")}>🐓</NavLink>
        <NavLink onClick={() => setPath("/wishlist")}>📒</NavLink>
        <NavLink onClick={() => setPath("/admin")}>👑</NavLink>
        <NavLink onClick={() => setPath("/profil")}>🎀</NavLink>
      </Nav>
      {path === "/roster" && <Roster />}
      {path === "/wishlist" && <WishList />}
      {path === "/profil" && <Profil />}
    </>
  );
}
