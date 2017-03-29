import defaultOptions from './defaults';
import isNumber from 'lodash-es/isNumber';
import assign from 'lodash-es/assign';
import adaptors from './adaptor/index';

export default class JSCache {
  _ttl = {};
  static adaptors = adaptors;
  static version = '__VERSION__';

  constructor(options = {}) {
    this.options = assign(defaultOptions, options);
    const { adaptor } = this.options;
    this.adaptor = new adaptor();
  }

  get(key, options = {}) {
    const expire = this._ttl[key];
    if (expire === 0 || Date.now() <= expire) {
      return Promise.resolve().then(() => this.adaptor.get(key, options));
    } else {
      delete this._ttl[key];
      return Promise.resolve().then(() => this.adaptor.remove(key, options)).then(() => {});
    }
  }

  set(key, value, options = {}) {
    const { ttl = this.options.ttl } = options;
    this._ttl[key] = this._expire(ttl);
    return Promise.resolve().then(() => this.adaptor.set(key, value, options));
  }

  remove(key, options = {}) {
    const expire = this._ttl[key];
    delete this._ttl[key];
    return Promise.resolve().then(() => this.adaptor.remove(key, options));
  }

  clear(options = {}) {
    this._ttl = {};
    return Promise.resolve().then(() => this.adaptor.clear(options));
  }

  _expire(ttl) {
    if (!isNumber(ttl) || !ttl) {
      return 0;
    }
    return Date.now() + ttl;
  }
}
