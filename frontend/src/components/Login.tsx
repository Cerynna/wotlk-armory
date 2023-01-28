import { useRef } from "react";
import { login } from "../services/Auth";
import useLocalStorage from "../utils/UselocalStorage";
import Button from "./Button";
import Input from "./Input";

export default function LoginForm({
  setToken,
}: {
  setToken: (token: boolean) => void;
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
          console.log("click");
          if (!refLogin.current || !refPassword.current) return;
          setToken(
            await login(refLogin.current.value, refPassword.current.value)
          );
        }}
      />
    </>
  );
}
