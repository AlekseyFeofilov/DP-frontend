export class SelectItem {
  value: string;
  key: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
