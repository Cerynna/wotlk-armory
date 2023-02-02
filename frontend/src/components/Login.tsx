import { useRef, useState } from "react";
import styled from "styled-components";
import { login, register } from "../services/Auth";
import { User } from "../types/User";
import useLocalStorage from "../utils/UselocalStorage";
import Button from "./Button";
import Input from "./Input";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export default function LoginForm({
  setToken,
  setUser,
}: {
  setToken: (token: boolean) => void;
  setUser: (user: User | boolean) => void;
}) {
  const refLogin = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refPasswordBis = useRef<HTMLInputElement>(null);

  const [toggleLogin, setToggleLogin] = useState(false);

  return (
    <Container>
      <Input label="Login" refInput={refLogin} value={"Hystérias"} />
      <Input
        label="Password"
        type="password"
        refInput={refPassword}
        value={"azerty"}
      />
      {toggleLogin && (
        <Input
          label="Password x2"
          type="password"
          refInput={refPasswordBis}
          value={"azerty"}
        />
      )}
      <Button
        label="Send"
        onClick={async () => {
          if (!toggleLogin) {
            if (!refLogin.current || !refPassword.current) return;
            let { token, user } = await login(
              refLogin.current.value,
              refPassword.current.value
            );
            setUser(user);
            setToken(token);
          } else {
            if (
              !refLogin.current ||
              !refPassword.current ||
              !refPasswordBis.current
            )
              return;
            if (refPassword.current.value !== refPasswordBis.current.value)
              return;
            let { token, user } = await register(
              refLogin.current.value,
              refPassword.current.value
            );
            setUser(user);
            setToken(token);
          }
        }}
      />
      <Button
        label={!toggleLogin ? "Inscription" : "Login"}
        onClick={async () => {
          setToggleLogin(!toggleLogin);
        }}
      />
    </Container>
  );
}
