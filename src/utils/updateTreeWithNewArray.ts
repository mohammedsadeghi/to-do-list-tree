import { TreeItem as TreeItemType } from "../types/mainPageTypes";

export function updateTreeWithNewArray(
  tree: TreeItemType[],
  targetId: string,
  newArray: TreeItemType[],
  level: number = 0
): TreeItemType[] {
  return tree.map((t) => {
    if (t.id === targetId) {
      const updatedItem = newArray.find((i) => i.id === targetId);
      return updatedItem || t;
    }
    if (t.children.length > 0) {
      return {
        ...t,
        children: updateTreeWithNewArray(
          t.children,
          targetId,
          newArray,
          level + 1
        ),
      };
    }
    return t;
  });
}
