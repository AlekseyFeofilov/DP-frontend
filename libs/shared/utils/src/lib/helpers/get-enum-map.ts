type Enum = {
  [key: string]: string | number;
};

export function getEnumMap<
  T extends Enum,
  E extends { [key in keyof T]: string | number },
>(firstEnum: T, secondEnum: E) {
  return Object.keys(firstEnum).reduce(
    (acc, key) => ({
      ...acc,
      [firstEnum[key as keyof T]]: secondEnum[key as keyof T],
    }),
    {} as Record<T[keyof T], E[keyof E]>,
  );
}
