import "./WordsYouLearned.css";
import { SyntheticEvent, useState } from "react";

export function WordsYouLearned({
  dictionaries,
  handler,
}: {
  dictionaries: string[];
  handler: (word: string) => (event: SyntheticEvent) => void;
}) {
  return (
    <ul className="mb-4">
      {!dictionaries || dictionaries.length === 0 ? (
        <li>no words.</li>
      ) : (
        dictionaries.map((word) => {
          return (
            <li key={word} className="inline-block mr-1 mb-1">
              <a
                href="#"
                onClick={handler(word)}
                className="block p-1 rounded border border-solid border-present bg-white text-present font-bold hover:bg-present hover:text-white"
              >
                {word.toUpperCase()}
              </a>
            </li>
          );
        })
      )}
    </ul>
  );
}
