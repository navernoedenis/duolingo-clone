type Item = {
  order: number;
};

export const getNextOrder = <T extends Item>(items: T[]) => {
  return items.length ? items[items.length - 1].order + 1 : 1;
};
