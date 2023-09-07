import chokidar from "chokidar";
import { pathResolve } from "./utils";
import * as vite from "vite";

const buildPopup = () => vite.build({ mode: "popup" });
const buildContent = () => vite.build({ mode: "content" });

buildPopup();
buildContent();

chokidar.watch(pathResolve("src/popup/**/*")).on("change", () => {
  buildPopup();
});

chokidar.watch(pathResolve("src/content/**/*")).on("change", () => {
  buildContent();
});
