import { ExtensionStorage } from "../content/constant";

export function filterDictionariesWithEvals(
  dicts: string[],
  evals: ExtensionStorage["evaluations"]
) {
  const { absent, present, correct } = evals;
  return dicts
    .filter((word) => {
      return word.split("").every((letter, index) => {
        if (correct[index] === "") return true;
        return letter === correct[index];
      });
    })
    .filter((word) => {
      if (!absent.length) return true;
      return (
        word
          .split("")
          .filter((letter, index) => absent.some((ab) => letter === ab[index]))
          .length < 1
      );
    })
    .filter((word) => {
      if (!present.length) return true;
      return present.every((pr) => {
        if (pr.every((prl) => prl === "")) return true;
        return pr.every((prl, i) => word[i] !== prl && word.includes(prl));
      });
    });
}

export async function getCurrentTab() {
  const queryOptions = { url: ["https://www.nytimes.com/games/wordle/*"] };
  const tabs = await chrome.tabs.query(queryOptions);
  const activeTabs = tabs.filter((t) => t.active);
  return activeTabs.length > 0 ? activeTabs[0] : tabs[0];
}
