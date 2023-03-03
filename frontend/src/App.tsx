import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import { logout } from "./services/Auth";
import useLocalStorage from "./utils/UselocalStorage";

import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import { getBosses } from "./services/Bosses";
import StyledButton from "./components/Button";
import { User } from "./types/User";
import Nimbex from "./EasterEgg/Nimbex";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(22, 22, 22);
  font-family: "Montserrat", sans-serif;
  color: white;
  background-color: rgb(22, 22, 22);
  min-height: 100vh;
  max-width: calc(100vw - 2rem);
  padding: 0 1rem;
  position: relative;
`;
const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  width: 100%;
  height: 3rem;
  background-color: rgb(22, 22, 22);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Header = styled.header`
  width: 100%;
  height: 4rem;
  background-color: rgb(22, 22, 22);
  color: white;
  display: grid;
  grid-template-columns: 3rem 1fr 1rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(200, 200, 200);
  color: rgb(22, 22, 22);
  font-family: "Montserrat", sans-serif;
  border-radius: 1rem;
  padding: 1rem;
  /* max-height: 80vh; */
  max-width: calc(70vw - 2rem);
  min-width: 600px;
  overflow: scroll;
  place-self: start center;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2rem;
  &:hover {
    transform: scale(1.1);
  }
`;

function App() {
  const [token, setToken] = useLocalStorage("token", false);
  const [user, setUser] = useLocalStorage<User | false>("user", false);
  const [Bosses, setBosses] = useLocalStorage("Bosses", []);

  useEffect(() => {
    if (Bosses.length === 0) {
      getBosses().then((res) => {
        setBosses(res);
      });
    }
  }, [Bosses]);
  return (
    <AppContainer>
      <Header>
        {user && <Nimbex user={user} />}
        <span />
        <H1>Fearless Tools 🔧</H1>
        {token && (
          <Logout
            onClick={() => {
              setToken(logout());
              setUser(false);
            }}
          >
            ❌
          </Logout>
        )}
      </Header>
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Container>
                  {token ? (
                    <Home />
                  ) : (
                    <Login setToken={setToken} setUser={setUser} />
                  )}
                </Container>
              }
            />
          </Routes>
        </Router>
      </main>
      <Footer>Made with ❤️ by Hystérias & Byol & Disco</Footer>
    </AppContainer>
  );
}

export default App;
