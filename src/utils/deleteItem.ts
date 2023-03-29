import { TreeItem as TreeItemType } from "../types/mainPageTypes";

export const deleteItem = (
  tree: TreeItemType[],
  itemId: string
): TreeItemType[] => {
  const index = tree.findIndex((t) => t.id === itemId);
  if (index !== -1) {
    return [...tree.slice(0, index), ...tree.slice(index + 1)];
  }

  return tree.map((t) => {
    if (t.children.length > 0) {
      return { ...t, children: deleteItem(t.children, itemId) };
    }
    return t;
  });
};
