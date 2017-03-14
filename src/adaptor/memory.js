export default class MemoryStore {
  _data = {};
  
  get(key, options) {
    return this._data[key];
  }

  set(key, value, options) {
    this._data[key] = value;
  }

  remove(key, options) {
    delete this._data[key];
  }

  clear(options) {
    this._data = {};
  }
}
