export interface FormValue<T> {
  value: T;
  finishHandler?: () => void;
}
