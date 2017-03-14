import defaultOptions from './defaults';
import isNumber from 'lodash-es/isNumber';
import assign from 'lodash-es/assign';
import adaptors from './adaptor/index';

export default class JSCache {
    _ttl = {};
    static adaptors = adaptors;

    constructor(options) {
        this.options = assign(defaultOptions, options);
    }

    get(key, options) {
        const promise = Promise.resolve();
        const expire = this._ttl[key];
        if (expire === 0 || Date.now() > expire) {
            const { adaptor } = this.options;
            return promise.then(() => adaptor.get(key, options));
        } else {
            return promise;
        }
    }

    set(key, value, options) {
        const { ttl = this.options.ttl } = options;
        this._ttl[key] = _expire(ttl);
        const { adaptor } = this.options;
        return Promise.resolve().then(() => adaptor.set(key, value, options));
    }

    remove(key, options) {
        const { adaptor } = this.options;
        const expire = this._ttl[key];
        delete this._ttl[key];
        return Promise.resolve().then(() => adaptor.remove(key, options));
    }

    clear(options) {
        const { adaptor } = this.options;
        this._ttl = {};
        return Promise.resolve().then(() => adaptor.clear(options));
    }

    _expire(ttl) {
        if (!isNumber(ttl) || !ttl) {
            return 0;
        }
        return Date.now() + ttl;
    }
}
