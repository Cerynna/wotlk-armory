import { useEffect } from "react";
import { User } from "../types/User";

export default function Nimbex({ user }: { user: User }) {
  const allowed = ["Nimbex", "Hystérias", "Byol", "Disco"];
  useEffect(() => {
    if (allowed.includes(user.pseudo)) {
      const audio = new Audio("/assets/sounds/547964");
      audio.play();
    }
  });
  return <></>;
}
