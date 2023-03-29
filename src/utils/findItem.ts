import { TreeItem as TreeItemType } from "../types/mainPageTypes";

export function findItem(
  tree: TreeItemType[],
  itemId: string
): { item: TreeItemType; array: TreeItemType[] } | null {
  for (const item of tree) {
    if (item.id === itemId) {
      return { item, array: tree };
    } else {
      const result = findItem(item.children, itemId);
      if (result) return result;
    }
  }
  return null;
}
export function findPrevoiusItem(
  tree: TreeItemType[],
  itemId: string
): { prevItem: TreeItemType } | null {
  const index = tree.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    return { prevItem: tree[index - 1] };
  }
  for (const item of tree) {
    const result = findPrevoiusItem(item.children, itemId);
    if (result) return result;
  }
  return null;
}
