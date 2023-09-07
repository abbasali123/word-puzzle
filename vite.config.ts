import { dirname, relative } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { pathResolve } from "./utils";
import WindiCSS from "vite-plugin-windicss";
import windiConfig from "./windi.config";

export default defineConfig(({ command, mode }) => ({
  root: pathResolve("src"),
  base: command === "serve" ? "http://localhost:3000/" : "/dist/",
  build: {
    outDir: pathResolve("extension/dist"),
    emptyOutDir: false,
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        [mode]: pathResolve(`src/${mode}/index.html`),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  plugins: [
    mode === "popup" ? react() : null,
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      },
    },
    WindiCSS({
      config: windiConfig,
    }),
  ],
}));
