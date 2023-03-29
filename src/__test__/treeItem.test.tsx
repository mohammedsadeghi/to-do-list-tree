import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import TreeItem from "../components/mainPage/treeItem";
import { TreeItem as TreeItemType } from "../types/mainPageTypes";

const testItem: TreeItemType = {
  id: "1",
  title: "Test Item",
  children: [],
};

const renderTreeItem = (item: TreeItemType, level: number) => {
  //   return render(
  //     <RecoilRoot>
  //       <TreeItem
  //         item={item}
  //         level={level}
  //         expandedItemId={expandedItemId}
  //         setExpandedItemId={setExpandedItemId}
  //       />
  //     </RecoilRoot>
  //   );
};

test("renders tree item with title", () => {
  renderTreeItem(testItem, 0);
  const itemTitle = screen.getByText("Test Item");
  expect(itemTitle).toBeInTheDocument();
});

test("edits tree item title on double click", () => {
  renderTreeItem(testItem, 0);
  const itemTitle = screen.getByText("Test Item");
  fireEvent.doubleClick(itemTitle);
  const input = screen.getByDisplayValue("Test Item");
  userEvent.type(input, " Updated");
  fireEvent.keyDown(input, { key: "Enter" });
  const updatedTitle = screen.getByText("Test Item Updated");
  expect(updatedTitle).toBeInTheDocument();
});

test("indents tree item with Tab key", () => {
  renderTreeItem(testItem, 0);
  const itemTitle = screen.getByText("Test Item");
  fireEvent.focus(itemTitle);
  fireEvent.keyDown(itemTitle, { key: "Tab" });
  const treeItem = screen.getByTestId("tree-item");
  expect(treeItem).toHaveStyle("padding-left: 16px");
});
