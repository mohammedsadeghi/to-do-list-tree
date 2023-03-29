import { atom } from "recoil";
import { TreeItem } from "../../types/mainPageTypes";

export const treeState = atom<TreeItem[]>({
  key: "treeState",
  default: JSON.parse(localStorage.getItem("treeData") || "[]"),
});

export const focusedItemIdState = atom<string | null>({
  key: "focusedItemIdState",
  default: null,
});
export const expandedItemIdsState = atom<string[]>({
  key: "expandedItemIdsState",
  default: [],
});
