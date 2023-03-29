# Project Documentation

## Overview

This project is a React based web application that implements a tree-like structure for organizing items. Users can add, delete, and edit items within the tree, as well as change the item hierarchy through various key bindings. The application leverages Recoil for state management.

## File Structure

The project is organized into the following main files and components:

- `App.tsx`: The main entry point for the application, which includes the Recoil root.
- `MainPage.tsx`: The main page component that renders the tree structure and handles adding new items.
- `TreeItem.tsx`: A recursive component responsible for rendering individual items in the tree, along with their respective children.
- `TreeItemInput.tsx`: Input component that allows editing of item titles and handles related key events.
- `TreeItemChildren.tsx`: A component for rendering the children of a particular item.
- Helper functions:
  - `findItem.ts`: Functions to find specific items within the tree based on their IDs.
  - `findParent.ts`: Function to find the parent of a given item in the tree.
  - `insertNewItem.ts`: Functions for inserting new items into the tree as siblings or children.
  - `deleteItem.ts`: Function to remove an item from the tree.
  - `updateTreeWithNewArray.ts`: Function to update the tree with a given array of items.

## Main Components

### App

The `App` component wraps the `MainPage` component in a `RecoilRoot` to enable state management within the application.

### MainPage

The main page component is responsible for rendering the tree structure and handling the insertion of new items. It listens for "Enter" key events to insert a new item as a sibling of the current focused item.

    (e: React.KeyboardEvent) => {
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
    }

### TreeItem

The `TreeItem` component is a recursive component responsible for rendering individual items in the tree and their children.

### TreeItemInput

The `TreeItemInput` component is responsible for handling item title editing and related key events. It listens for "Enter", "Tab", "Shift + Tab", and "Ctrl + Shift + Delete" key events to perform various actions such as updating the item, moving items, and deleting items.

## Helper Functions

The project includes several helper functions to facilitate tree manipulation including:

- `findItem`: Functions to find specific items within the tree based on their IDs.
- `findParent`: Function to find the parent of a given item in the tree.
- `insertNewItem`: Functions for inserting new items into the tree as siblings or children.
- `deleteItem`: Function to remove an item from the tree.
- `updateTreeWithNewArray`: Function to update the tree with a given array of items.

## Usage

In order to use the application, the user can interact with the tree by adding, editing or removing items through key bindings. These are the main actions that can be performed within the tree:

- Press "Enter" to insert a new item as a sibling to the currently focused item.
- Press "Tab" to move the focused item as a child of the previous item.
- Press "Shift+Tab" to move the focused item as a sibling before its parent.
- Press "Ctrl+Shift+Delete" to delete the focused item.

The application's state is persisted in the browser's `localStorage` for persistence across page reloads.

## Conclusion

This project provides a simple and user-friendly interface for organizing items in a tree-like structure. By leveraging Recoil for state management, the application ensures efficient updates to the tree and encapsulates item manipulation logic in helper functions.
