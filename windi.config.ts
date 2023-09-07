import { pathResolve } from "./utils";
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: [pathResolve(__dirname, "src/**/*.{tsx,html}")],
  },
  theme: {
    extend: {
      colors: {
        present: "#b59f3b",
        correct: "#538d4e",
      },
    },
  },
});
