import { atom } from "recoil";
import { TreeType } from "../../types/mainPageTypes";

export const treeValues = atom<TreeType>({
  key: "treeValues",
  default: { title: "", children: [], id: "", parentId: "" },
});
