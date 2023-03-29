import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  treeState,
  focusedItemIdState,
  expandedItemIdsState,
} from "../../recoil/mainPage/atom";
import { TreeItem as TreeItemType } from "../../types/mainPageTypes";
import useTreeItemKeyHandlers from "../../utils/useHandleKeyDown";
import { findItem } from "../../utils/findItem";
import { updateTreeWithNewArray } from "../../utils/updateTreeWithNewArray";

interface TreeItemInputProps {
  item: TreeItemType;
  level: number;
}

export const TreeItemInput: React.FC<TreeItemInputProps> = ({
  item,
  level,
}) => {
  const [tree, setTree] = useRecoilState(treeState);
  const [focusedItemId, setFocusedItemId] = useRecoilState(focusedItemIdState);

  const inputRef = useRef<HTMLInputElement>(null);
  const [expandedItemIds, setExpandedItemIds] =
    useRecoilState(expandedItemIdsState);

  useEffect(() => {
    if (focusedItemId === item.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusedItemId, item.id]);
  const handleKeyDown = useTreeItemKeyHandlers({
    item,
    tree,
    setTree,
    focusedItemId,
    setFocusedItemId,
  });

  const handleClick = () => {
    if (expandedItemIds.includes(item.id)) {
      setExpandedItemIds(expandedItemIds.filter((id) => id !== item.id));
    } else {
      setExpandedItemIds([...expandedItemIds, item.id]);
    }
  };
  const handleInputClick = () => {
    setFocusedItemId(item.id);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const foundItem = findItem(tree, item.id);
    if (foundItem) {
      const { item: targetItem, array: itemArray } = foundItem;
      const updatedArray = itemArray.map((t) =>
        t.id === targetItem.id ? { ...t, title: e.target.value } : t
      );
      setTree(updateTreeWithNewArray(tree, item.id, updatedArray));
      localStorage.setItem("treeData", JSON.stringify(tree));
    }
  };

  return (
    <div className="tree-item" style={{ marginLeft: level * 20 }}>
      <span
        className={
          item.children.length > 0
            ? "tree-item-circle"
            : "tree-item-circle-small"
        }
        onClick={handleClick}
      ></span>
      <input
        ref={inputRef}
        value={item.title}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onFocus={handleInputClick}
        data-testid="tree-input"
      />
    </div>
  );
};
