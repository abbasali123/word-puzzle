import { $gameRows, $gameTiles, ExtensionStorage } from "./constant";

export function getRowLettersValue(insertIndex: number) {
  const $currentRow = $gameRows[insertIndex] as HTMLElement;
  return $currentRow.getAttribute("letters") as string;
}

export function updateExtensionStorage(word: string) {
  const { myDictionaries }: ExtensionStorage = JSON.parse(
    localStorage.getItem("hackaWordle") as string
  ) || {
    myDictionaries: [],
    evaluations: {
      correct: ["", "", "", "", ""],
      absent: [],
      present: [],
    },
  };
  const { correct, present, absent } = getEvaluationsFromScreen();
  myDictionaries.push(word);

  localStorage.setItem(
    "hackaWordle",
    JSON.stringify({
      myDictionaries: [...new Set(myDictionaries)],
      evaluations: {
        correct,
        present,
        absent,
      },
    } as ExtensionStorage)
  );
}

export function getEvaluationsFromScreen() {
  const correct: string[] = ["", "", "", "", ""];
  const present: string[][] = [];
  const absent: string[][] = [];
  $gameTiles.forEach((tiles) => {
    const newPresent = Array.from({ length: 5 }, () => "");
    const newAbsent = Array.from({ length: 5 }, () => "");
    [...tiles].forEach((tile, index) => {
      const letter = tile.getAttribute("letter");
      const evaluation = tile.getAttribute("evaluation");
      if (letter) {
        if (evaluation === "correct") correct[index] = letter;
        if (evaluation === "present") newPresent[index] = letter;
        if (evaluation === "absent") newAbsent[index] = letter;
      }
    });
    present.push(newPresent);
    absent.push(newAbsent);
  });
  return {
    correct,
    absent,
    present,
  };
}
