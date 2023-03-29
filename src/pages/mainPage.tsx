import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import TreeItem from "../components/mainPage/treeItem";
import { treeState, focusedItemIdState } from "../recoil/mainPage/atom";
import { TreeItem as TreeItemType } from "../types/mainPageTypes";
import { insertAsSibling } from "../utils/insertNewItem";

const MainPage: React.FC = () => {
  const [tree, setTree] = useRecoilState(treeState);
  const [focusedItemId, setFocusedItemId] = useRecoilState(focusedItemIdState);
  console.log("====================================");
  console.log({ tree });
  console.log("====================================");
  const handleAddItem = () => {
    const newItem: TreeItemType = {
      id: uuidv4(),
      title: "New Item",
      children: [],
    };
    const newTree = [...tree, newItem];
    setTree(newTree);
    localStorage.setItem("treeData", JSON.stringify(newTree));
    setFocusedItemId(newItem.id);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && focusedItemId) {
        e.preventDefault();

        if (focusedItemId) {
          const newItem: TreeItemType = {
            id: uuidv4(),
            title: "New Item",
            children: [],
          };
          console.log({ focusedItemId });

          const newTree = insertAsSibling(tree, focusedItemId, newItem);
          setTree(newTree);
          localStorage.setItem("treeData", JSON.stringify(newTree));

          setTimeout(() => {
            setFocusedItemId(newItem.id);
          }, 0);
        }
      }
    },
    [focusedItemId, tree, setTree, setFocusedItemId]
  );

  return (
    <div className="tree-container" onKeyDown={handleKeyDown} tabIndex={0}>
      {tree.map((item) => (
        <TreeItem key={item.id} item={item} level={0} />
      ))}
      <button onClick={handleAddItem}>+</button>
    </div>
  );
};

export default MainPage;
