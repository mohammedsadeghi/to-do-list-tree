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
  return render(
    <RecoilRoot>
      <TreeItem item={item} level={level} />
    </RecoilRoot>
  );
};

test("renders tree item with title", () => {
  renderTreeItem(testItem, 0);
  const treeInput = screen.getByTestId("tree-input");
  expect(treeInput).toHaveValue("Test Item");
});
