import { resolve } from "node:path";

export const pathResolve = (...args: string[]) => resolve(__dirname, ...args);
