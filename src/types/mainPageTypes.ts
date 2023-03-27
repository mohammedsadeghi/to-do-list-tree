export type TreeType = {
  title: string;

  children: TreeType[];
  id: string;
  parentId: string;
};
