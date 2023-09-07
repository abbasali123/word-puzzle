type StorageState = {
  boardState: string[];
};

export type ExtensionStorage = {
  myDictionaries: string[];
  evaluations: {
    correct: string[];
    present: string[][];
    absent: string[][];
  };
};

export const $gameRows = document!
  .querySelector("game-app")!
  .shadowRoot!.querySelector("game-theme-manager")!
  .querySelectorAll("#board game-row[letters]");

export const $gameTiles = [
  ...document!
    .querySelector("game-app")!
    .shadowRoot!.querySelectorAll("#board game-row"),
].map((e) => e.shadowRoot!.querySelectorAll("game-tile"));

export const { boardState }: StorageState = JSON.parse(
  localStorage.getItem("nyt-wordle-state") as string
);

export const SendWordAction = () => ({
  event: "app:add-word",
  data: JSON.parse(localStorage.getItem("hackaWordle") as string),
});
