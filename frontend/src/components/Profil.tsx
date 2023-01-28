import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { whoiam } from "../services/Auth";
import { FindClass, FindRole } from "../types/Character";
type User = {
  pseudo: string;
  classe: string;
  role: string;
  isAdmin: boolean;
};

export default function Profil() {
  const inProgress = useRef(false);
  const [user, setUser] = useState<User | false>(false);
  useEffect(() => {
    if (inProgress.current) {
      return;
    }
    inProgress.current = true;
    Promise.resolve(whoiam()).then((user) => {
      if (!user) return;
      setUser(user);
      inProgress.current = false;
      if (!user) return;
    });
  }, []);

  const ClassIcon = styled.div`
    width: 5rem;
    height: 5rem;
    background-image: url(${(props: { url: string }) => props.url});
    background-size: cover;
    border-radius: 0.5rem;
  `;

  const Pseudo = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: ${(props: { color: string }) => props.color};
  `;
  const Role = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
  `;
  const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    width: 50vw;
  `;
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 0.5rem;
    padding: 1rem;
    gap: 1rem;
  `;
  const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 1rem;
  `;
  const Button = styled.button`
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `;
  const Textarea = styled.textarea`
    width: 50vw;
    height: 10vh;
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `;

  const [modal, setModal] = useState(false);
  const refTextarea = useRef<HTMLTextAreaElement>(null);

  function parse80Upgrade(text: string) {
    const data = JSON.parse(text);
    const { items } = data;
    return items.map((item: any) => item.id);
  }

  if (!user) return <div>Chargement...</div>;
  const currentClass = FindClass(user.classe);
  const currentRole = FindRole(user.role);

  return (
    <Container>
      <Header>
        <ClassIcon url={`/assets${currentClass!.icon}`} />
        <Row>
          <Pseudo color={currentClass!.color}>{user.pseudo}</Pseudo>

          <Role>{currentRole?.icon}</Role>
        </Row>
      </Header>
      <Button
        onClick={() => {
          setModal(!modal);
          const clipboardContent = navigator.clipboard.readText();
          clipboardContent.then(async (text) => {
            if (text) {
              console.log(parse80Upgrade(text));
              /*               setMembres(await parseData(text, membres)); */
            }
          });
        }}
      >
        ✍️
      </Button>
      {/* {modal && ( */}
      <div>
        <Textarea ref={refTextarea}></Textarea>
      </div>
      {/* )} */}
    </Container>
  );
}
