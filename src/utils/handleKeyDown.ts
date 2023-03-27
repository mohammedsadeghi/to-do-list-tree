import { v4 as uuidv4 } from "uuid";
import { TreeType } from "../types/mainPageTypes";
type handleKeyDownProps = {
  event: React.KeyboardEvent<HTMLInputElement>;
  currentItem: TreeType;
  nodes: TreeType[];
  setItems: (nodes: TreeType[]) => void;
};

export const handleKeyDown = ({
  event,
  currentItem,
  nodes,
  setItems,
}: handleKeyDownProps) => {
  if (event.key === "Enter") {
    const newItem = {
      id: uuidv4(),
      title: "New Item",
      children: [],
      parentId: currentItem.id,
    };
    const newItems = [...nodes];
    const index = newItems.findIndex((i) => i.id === currentItem.id);
    newItems[index].children.push(newItem);
    setItems(newItems);
  } else if (event.key === "Tab") {
    event.preventDefault();
    const newItems = [...nodes];
    const parentIndex = newItems.findIndex((i) =>
      i.children.map((treeItem: TreeType) => treeItem.id === currentItem.id)
    );
    newItems[parentIndex].children = newItems[parentIndex].children.filter(
      (i) => i.id !== currentItem.id
    );
    const newParentIndex = newItems.findIndex(
      (i) => i.id === currentItem.parentId
    );
    newItems[newParentIndex].children.push(currentItem);
    setItems(newItems);
  } else if (event.key === "Delete" && event.ctrlKey && event.shiftKey) {
    const newItems = [...nodes];
    const parentIndex = newItems.findIndex((i) =>
      i.children.includes(currentItem)
    );
    newItems[parentIndex].children = newItems[parentIndex].children.filter(
      (i) => i.id !== currentItem.id
    );
    setItems(newItems);
  }
};
