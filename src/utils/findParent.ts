import { TreeItem as TreeItemType } from "../types/mainPageTypes";

export function findParent(
  tree: TreeItemType[],
  itemId: string,
  parentId?: string
): { parent: TreeItemType; index: number; focusedItemIndex: number } | null {
  let index = 0;
  for (const item of tree) {
    const focusedItemIndex = item.children.findIndex(
      (child) => child.id === itemId
    );
    if (focusedItemIndex > -1) {
      return { parent: item, index, focusedItemIndex };
    } else {
      const result = findParent(item.children, itemId, item.id);
      if (result) return { ...result, index };
    }
    index++;
  }
  return null;
}
