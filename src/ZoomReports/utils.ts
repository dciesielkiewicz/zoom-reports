const MAX_COUNT = 20;

export const hasCountInName = (name: string) =>
  !!name.match(/\d+/g)?.find((count) => Number(count) <= MAX_COUNT);