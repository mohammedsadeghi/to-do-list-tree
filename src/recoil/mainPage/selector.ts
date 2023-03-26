import { selector } from "recoil";
import { treeValues } from "./atom";

export const toDoTree = selector({
  key: "toDoTree",
  get: ({ get }) => get(treeValues),
  set: ({ set }, newValue) => set(treeValues, newValue),
});
