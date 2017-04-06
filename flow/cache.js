declare interface Adaptor<T> {
  get(string | number, ?Object): T;
  set(string | number, T, ?Object): void;
  remove(string | number, ?Object): void;
  clear(?Object): void;
}
