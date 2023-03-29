import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import MainPage from "../pages/mainPage";

const renderMainPage = () => {
  return render(
    <RecoilRoot>
      <MainPage />
    </RecoilRoot>
  );
};

test("renders add button", () => {
  renderMainPage();
  const addButton = screen.getByText("+");
  expect(addButton).toBeInTheDocument();
});

test("adds a new item when the add button is clicked", () => {
  renderMainPage();
  const addButton = screen.getByText("+");
  fireEvent.click(addButton);
  const treeInput = screen.getByTestId("tree-input");
  expect(treeInput).toHaveValue("New Item");
});

test("adds a new item below the focused item when the Enter key is pressed", () => {
  renderMainPage();
  const addButton = screen.getByText("+");
  fireEvent.click(addButton);
  const treeInput = screen.getByTestId("tree-input");
  fireEvent.focus(treeInput);
  fireEvent.keyDown(treeInput, { key: "Enter" });
  const newItems = screen.getAllByTestId("tree-input");
  expect(newItems.length).toBe(2);
});
