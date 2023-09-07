import { boardState, SendWordAction } from "./constant";
import { getRowLettersValue, updateExtensionStorage } from "./function";

let currentRowIndex = boardState.findIndex((word) => word === "");
let revealedCount = 0;
let currentPort: chrome.runtime.Port | null = null;

/** Chrome Extension Event Listen */
chrome.runtime.onConnect.addListener((port) => {
  currentPort = port;
  port.onMessage.addListener((message) => {
    console.log(message);

    if (message.event === "app:boot") {
      port.postMessage(SendWordAction());
    }

    if (message.type === "app:send-word") {
      message.data.split("").forEach((letter: string) => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: letter,
          })
        );
      });
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
        })
      );
    }
  });
});

/** Window CustomEvent Listen */
window.addEventListener("game-last-tile-revealed-in-row", () => {
  revealedCount++;
  if (revealedCount !== currentRowIndex + 1) {
    /**  */
  } else {
    const value = getRowLettersValue(currentRowIndex);
    updateExtensionStorage(value);
    try {
      currentPort!.postMessage(SendWordAction());
    } catch (error) {
      console.warn(error);
    }
    currentRowIndex++;
  }
});
