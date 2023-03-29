import React from "react";
import { TreeItem as TreeItemType } from "../../types/mainPageTypes";
import TreeItem from "./treeItem";
import { expandedItemIdsState } from "../../recoil/mainPage/atom";
import { useRecoilState } from "recoil";

interface TreeItemChildrenProps {
  item: TreeItemType;
  level: number;
}

export const TreeItemChildren: React.FC<TreeItemChildrenProps> = ({
  item,
  level,
}) => {
  const [expandedItemIds] = useRecoilState(expandedItemIdsState);
  return (
    <>
      {expandedItemIds.includes(item.id) &&
        item.children.map((child) => (
          <TreeItem key={child.id} item={child} level={level + 1} />
        ))}
    </>
  );
};
