import { useRef } from "react";
import { login } from "../services/Auth";
import { User } from "../types/User";
import useLocalStorage from "../utils/UselocalStorage";
import Button from "./Button";
import Input from "./Input";

export default function LoginForm({
  setToken,
  setUser,
}: {
  setToken: (token: boolean) => void;
  setUser: (user: User | boolean) => void;
}) {
  const refLogin = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  return (
    <>
      <Input label="Login" refInput={refLogin} value={"Hystérias"} />
      <Input
        label="Password"
        type="password"
        refInput={refPassword}
        value={"azerty"}
      />
      <Button
        label="Send"
        onClick={async () => {
          if (!refLogin.current || !refPassword.current) return;
          let { token, user } = await login(
            refLogin.current.value,
            refPassword.current.value
          );
          setUser(user);
          setToken(token);
        }}
      />
    </>
  );
}
