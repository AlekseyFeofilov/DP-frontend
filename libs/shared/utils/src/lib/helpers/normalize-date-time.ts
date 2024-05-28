export function normalizeDateTime(dateTimeString: string): string {
  return dateTimeString.split('T')[0];
}
