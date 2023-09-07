import { SyntheticEvent } from "react";

export function Cheats({
  cheat,
  handler,
}: {
  cheat: string[];
  handler: (word: string) => (event: SyntheticEvent) => void;
}) {
  return (
    <details>
      <summary className="mb-2 font-bold">チラ見</summary>
      <ul>
        {cheat.map((cw) => {
          return (
            <li key={cw} className="inline-block mr-1 mb-1">
              <a
                href="#"
                onClick={handler(cw)}
                className="block p-1 rounded border border-solid border-correct bg-white text-correct font-bold hover:bg-correct hover:text-white"
              >
                {cw.toUpperCase()}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
