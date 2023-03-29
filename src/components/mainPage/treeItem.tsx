import React from "react";
import { TreeItem as TreeItemType } from "../../types/mainPageTypes";
import { TreeItemInput } from "./treeItemInput";
import { TreeItemChildren } from "./treeItemChildren";

interface TreeItemProps {
  item: TreeItemType;
  level: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ item, level }) => {
  return (
    <>
      <TreeItemInput item={item} level={level} />
      <TreeItemChildren item={item} level={level} />
    </>
  );
};

export default TreeItem;
