import styled from "styled-components";

const TutorialContainer = styled.ul`
  display: flex;
  flex-direction: column;
  atutorialstepgn-items: flex-start;
  justify-content: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  color: #ffffff;
  list-style: square;
`;
const TutorialStep = styled.li`
display: list-item;
  gap: 0.5rem;
  font-size: 1rem;
  color: #ffffff;
  & > a {
    color: #ffffff;
  }
`;

export default function Tutorial() {
  return (
    <TutorialContainer>
      <TutorialStep>
        Bah alors on arrive pas a crée une wishlist ???
      </TutorialStep>
      <TutorialStep>
        Déja commence par aller sur{" "}
        <a href="https://eightyupgrades.com/" target={"_blank"}>
          https://eightyupgrades.com/
        </a>
      </TutorialStep>
      <TutorialStep>
        Crée un "Character" avec ton nom de personnage et ton serveur
      </TutorialStep>
      <TutorialStep>
        Il te reste plus que a crée un set pour ton personage.
      </TutorialStep>
      <TutorialStep>Tu as déjà fini ???</TutorialStep>
      <TutorialStep>
        Maintenant sur la page de ton set tu clique sur les trois
        petit points en haut a gauche et tu clique sur export
      </TutorialStep>
      <TutorialStep>
        Il te reste plus qu'a cliquer sur "copy to clipboard"
      </TutorialStep>
      <TutorialStep>C'est presque fini</TutorialStep>
      <TutorialStep>Tu revien ici et tu clique sur ✍️</TutorialStep>
      <TutorialStep>
        Et la ta liste va s'afficher donne lui un nom simple
      </TutorialStep>
      <TutorialStep>
        Il te reste plus qu'a valider en bas de la liste
      </TutorialStep>
    </TutorialContainer>
  );
}
