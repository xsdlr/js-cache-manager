/*@flow*/
export default class MemoryStore implements Adaptor<Object> {
  _data = {};
  
  get(key: string | number, options: ?Object) {
    return this._data[key];
  }

  set(key: string | number, value: Object, options: ?Object) {
    this._data[key] = value;
  }

  remove(key: string | number, options: ?Object) {
    delete this._data[key];
  }

  clear(options: ?Object) {
    this._data = {};
  }
}
