import { FiltersCapacity } from '@dp/shared/types';

export function getStatusCapacity<T extends string, E extends { status: T }>(
  statuses: T[],
  entities: E[],
): FiltersCapacity<T> {
  return statuses.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: entities.filter(entity => entity.status === curr).length,
    }),
    {} as FiltersCapacity<T>,
  );
}
