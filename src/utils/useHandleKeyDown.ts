import { useCallback } from "react";
import { TreeItem as TreeItemType } from "../types/mainPageTypes";
import { findParent } from "./findParent";
import { deleteItem } from "./deleteItem";
import {
  insertAsChildForTab,
  insertAsSibling,
  insertAsSiblingForShiftPTab,
} from "./insertNewItem";
import { findPrevoiusItem } from "./findItem";

interface UseTreeItemKeyHandlersProps {
  item: TreeItemType;
  tree: TreeItemType[];
  setTree: (tree: TreeItemType[]) => void;
  focusedItemId: string | null;
  setFocusedItemId: (itemId: string | null) => void;
}

const useTreeItemKeyHandlers = ({
  item,
  tree,
  setTree,
  focusedItemId,
  setFocusedItemId,
}: UseTreeItemKeyHandlersProps) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        setFocusedItemId(item.id);
      } else if (e.key === "Tab") {
        e.preventDefault();
        const focusedItemIndex = tree.findIndex((t) => t.id === focusedItemId);
        const prevItem = findPrevoiusItem(tree, item.id);

        if (focusedItemIndex > 0) {
          const prevItem = tree[focusedItemIndex - 1];
          const focusedItem = tree[focusedItemIndex];
          const newTree = tree.filter((t) => t.id !== focusedItem.id);
          const updatedItem = {
            ...prevItem,
            children: [...prevItem.children, focusedItem],
          };
          const updatedTree = newTree.map((t) =>
            t.id === prevItem.id ? updatedItem : t
          );
          setTree(updatedTree);
          localStorage.setItem("treeData", JSON.stringify(updatedTree));
          setFocusedItemId(focusedItem.id);
        } else if (prevItem?.prevItem) {
          const deletedNodeTree = deleteItem(tree, item.id);

          const newTree = insertAsChildForTab(
            deletedNodeTree,
            prevItem.prevItem.id,
            item
          );

          setTree(newTree);
          localStorage.setItem("treeData", JSON.stringify(newTree));
          setFocusedItemId(item.id);
        }
      }
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        const parentInfo = findParent(tree, item.id);
        console.log({ parentInfo });

        if (parentInfo) {
          const { parent } = parentInfo;

          const newChildren = [
            ...parent.children.filter((i) => i.id !== item.id),
          ];
          const updatedParent = { ...parent, children: newChildren };

          const newestTree = insertAsSiblingForShiftPTab(tree, parent.id, [
            updatedParent,
            item,
          ]);

          setTree(newestTree);
          localStorage.setItem("treeData", JSON.stringify(newestTree));
          setFocusedItemId(item.id);
        }
      } else if (e.ctrlKey && e.shiftKey && e.key === "Delete") {
        e.preventDefault();
        const newTree = deleteItem(tree, item.id);
        setTree(newTree);
        localStorage.setItem("treeData", JSON.stringify(newTree));
      }
    },
    [setFocusedItemId, item, tree, focusedItemId, setTree]
  );

  return handleKeyDown;
};

export default useTreeItemKeyHandlers;

// If the 'Enter' key is pressed, the event's default behavior is prevented, the editing state
// of the tree item is set to false (not editing), and the focus is moved to the item with the item.id

//TAB
// The functionality of this event is to demote and nest the current tree item under the previous item in the tree
// This is achieved by following these steps:
// 1. Find the index of the currently focused item in the tree
// 2. Check if the focused item is not the first item in the tree
// 3. Remove the focused item from the tree
// 4. Add the removed item as a child of the previous item
// 5. Update the tree and save the new tree to local storage
// 6. Set the focus on the demoted/nested item

//SHIFT+TAB
// The functionality of this event is to promote the current tree item to the same level as its parent item
// This is achieved by following these steps:
// 1. Find the parent item and index of the current tree item using the custom findParent function
// 2. If the parent is found, remove the current tree item from its children
// 3. Update the parent item with the new list of children
// 4. Add the current tree item to the tree at the same level as the parent item
// 5. Update the tree and save the new tree to local storage
// 6. Set the focus on the promoted item

//DELETE
// The functionality of this event is to delete the current tree item from the tree structure
// This is achieved by following these steps:
// 1. Use the custom deleteItem function to update the tree and remove the current tree item from it
// 2. Save the new tree to local storage
