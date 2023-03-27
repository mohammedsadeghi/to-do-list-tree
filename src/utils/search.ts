import { TreeType } from "../types/mainPageTypes";

export const searchTree: (
  elements: TreeType[],
  matchingId: String
) => TreeType | null | undefined = (elements, matchingId) => {
  for (let element of elements) {
    if (element.id === matchingId) {
      return element;
    } else if (element.children != null) {
      let i;
      let result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = searchTree([element.children[i]], matchingId);
      }
      return result;
    }
    return null;
  }
};
