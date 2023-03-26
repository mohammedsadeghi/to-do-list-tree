import { atom } from "recoil";
import { TreeItem } from "../../types/mainPageTypes";

export const treeValues = atom<TreeItem>({
  key: "treeValues",
  default: { title: "", indent: 0, children: [], id: "" },
});
