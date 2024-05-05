type Enum = {
  [key: string]: string | number;
};

export function getEnumMap<T extends Enum>(
  firstEnum: T,
  secondEnum: { [key in keyof T]: string | number },
) {
  return Object.keys(firstEnum).reduce(
    (acc, key) => ({
      ...acc,
      [firstEnum[key]]: secondEnum[key],
    }),
    {} as Record<string | number, string | number>,
  );
}
