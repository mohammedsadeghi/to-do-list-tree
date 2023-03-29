import { TreeItem as TreeItemType } from "../types/mainPageTypes";

export function insertAsSibling(
  tree: TreeItemType[],
  siblingId: string,
  newItem: TreeItemType
): TreeItemType[] {
  const index = tree.findIndex((item) => item.id === siblingId);
  if (index !== -1) {
    return [...tree.slice(0, index + 1), newItem, ...tree.slice(index + 1)];
  }

  return tree.map((item) => {
    if (item.children.length > 0) {
      const updatedChildren = insertAsSibling(
        item.children,
        siblingId,
        newItem
      );
      return { ...item, children: updatedChildren };
    }
    return item;
  });
}

export function insertNewItem(
  tree: TreeItemType[],
  targetId: string,
  newItem: TreeItemType
): TreeItemType[] {
  const newTree = insertAsSibling(tree, targetId, newItem);
  return newTree || tree;
}

export function insertAsSiblingForShiftPTab(
  tree: TreeItemType[],
  siblingId: string,
  newItem: TreeItemType[]
): TreeItemType[] {
  const index = tree.findIndex((item) => item.id === siblingId);
  if (index !== -1) {
    const firstPartOfTree = [...tree.slice(0, index + 1)].filter(
      (i) => i.id !== siblingId
    );
    return [...firstPartOfTree, ...newItem, ...tree.slice(index + 1)];
  }

  return tree.map((item) => {
    if (item.children.length > 0) {
      const updatedChildren = insertAsSiblingForShiftPTab(
        item.children,
        siblingId,
        newItem
      );
      return { ...item, children: updatedChildren };
    }
    return item;
  });
}
export function insertAsChildForTab(
  tree: TreeItemType[],
  siblingId: string,
  item: TreeItemType
): TreeItemType[] {
  const index = tree.findIndex((mapItem) => mapItem.id === siblingId);

  if (index !== -1) {
    return [{ ...tree[index], children: [...tree[index].children, item] }];
  }

  return tree.map((mapItem) => {
    if (mapItem.children.length > 0) {
      const updatedChildren = insertAsChildForTab(
        mapItem.children,
        siblingId,
        item
      );
      return { ...mapItem, children: updatedChildren };
    }
    return mapItem;
  });
}
