import { SyntheticEvent, useEffect, useState } from "react";
import { ExtensionStorage } from "../content/constant";
import { Cheats } from "./components/Cheats";
import { Close } from "./components/Close";
import { Loading, ScreenLoading } from "./components/Loading";
import { Popup } from "./components/Popup";
import { Title } from "./components/Title";
import { WordsYouLearned } from "./components/WordsYouLearned";
import { filterDictionariesWithEvals, getCurrentTab } from "./function";
import words from "./words.json";

type DictionaryApiEntry = {
  word: string;
  meanings: [
    {
      definitions: Array<{
        definition: string;
      }>;
    }
  ];
};

const initialEntry: DictionaryApiEntry = {
  word: "Ooops",
  meanings: [
    {
      definitions: [{ definition: "Something went wrong..." }],
    },
  ],
};

function App() {
  const [isSending, setSending] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState<DictionaryApiEntry[]>([
    initialEntry,
  ]);
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | undefined>();
  const [currentPort, setCurrentPort] = useState<chrome.runtime.Port>();
  const [dictionaries, setDictionaries] = useState<string[]>([]);
  const [evaluations, setEvaluations] =
    useState<ExtensionStorage["evaluations"]>();
  const [cheat, setCheat] = useState<string[]>(words);
  const [filtered, setFiltered] = useState(false);

  const sendingHandler = (word: string) => (event: SyntheticEvent) => {
    event.preventDefault();
    if (currentTab && currentPort) {
      setSending(true);
      currentPort.postMessage({
        type: "app:send-word",
        data: word,
      });
    }
  };

  const fetchHandler = (word: string) => (event: SyntheticEvent) => {
    event.preventDefault();
    setFetching(true);
    setShowDescription(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then<DictionaryApiEntry[]>((r) => {
        if (!r.ok) {
          throw new Error(`status is ${r.status}`);
        }
        return r.json();
      })
      .then((data) => {
        setDescription(() => data);
      })
      .catch((e) => {
        console.warn(e);
        setDescription(() => [initialEntry]);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    getCurrentTab().then((tab) => {
      const port = chrome.tabs.connect(tab.id!);
      setCurrentTab(tab);
      setCurrentPort(port);

      /** アプリ初回起動をタブに伝達 */
      port.postMessage({ event: "app:boot" });

      port.onMessage.addListener((message: { event: string; data: any }) => {
        /** メッセージログ */
        console.log(message);

        /** 単語がタブから到着 */
        if (message.event === "app:add-word") {
          setSending(false);
          if (message.data) {
            setDictionaries(message.data.myDictionaries);
            setEvaluations(message.data.evaluations);
            setCheat(
              filterDictionariesWithEvals(cheat, message.data.evaluations)
            );
          }
        }
      });
    });
  }, []);

  return (
    <>
      {isSending ? <ScreenLoading /> : null}
      <Popup>
        <Title />
        <h2 className="text-lg mb-3">📝 Words you learned</h2>
        <label className="inline-block mb-2">
          Word Puzzle:{" "}
          <input
            type="checkbox"
            className="align-middle"
            onChange={() => setFiltered((prev) => !prev)}
          />
        </label>
        <WordsYouLearned
          dictionaries={
            filtered
              ? filterDictionariesWithEvals(dictionaries, evaluations!)
              : dictionaries
          }
          handler={fetchHandler}
        />
        {showDescription ? (
          <div className="sticky bottom-0 w-full bg-white border border-solid rounded mb-3">
            {isFetching ? (
              <Loading />
            ) : (
              <div className="p-2 relative">
                <Close handler={() => setShowDescription(false)}></Close>
                <h3 className="text-lg mb-2">{description[0].word}</h3>
                <ol className="list-decimal ml-4">
                  {description[0].meanings[0].definitions.map(
                    (definitionDetail, idx) => {
                      return <li key={idx}>{definitionDetail.definition}</li>;
                    }
                  )}
                </ol>
              </div>
            )}
          </div>
        ) : null}

        <h2 className="text-lg mb-3">🚫 Cheat</h2>
        <Cheats cheat={cheat} handler={sendingHandler} />
      </Popup>
    </>
  );
}

export default App;
