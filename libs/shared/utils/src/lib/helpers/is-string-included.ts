export function isStringIncluded(
  fullString: string,
  fragment: string,
): boolean {
  return fullString.toLowerCase().includes(fragment.toLowerCase());
}
