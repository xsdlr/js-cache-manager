# js-cache-manager
Fast and sample js cache module

[![Travis branch](https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square)](https://travis-ci.org/xsdlr/js-cache-manager)[![npm (scoped)](https://img.shields.io/npm/v/@cycle/core.svg?style=flat-square)](https://www.npmjs.com/package/js-cache-manager)
 
# install
```javascript
npm install js-cache-manager
``` 
# example
```javascript
var CacheManager = require('js-cache-manager');
var cache = new CacheManager();
cache.set('a', {a: 1}, {ttl: 60000});
cache.set('b', {b: 2}, {ttl: 60000});
console.log(cache.get('a')); // {a: 1}
cache.remove('a');
console.log(cache.get('a')); // undefined
cache.clear();
console.log(cache.get('b')); // undefined

cache.set('c', {c: 3}, {ttl: 100});
setTimeout(function(){
	console.log(cache.get('c')); // undefined
}, 1000);
```
# api
## constructor
- constructor
- @param {Object} options
 - options like {adaptor: adaptor, ttl: 100}
 - adaptor default implement with memory (example in src/adaptor/memory)
	
## set value	
- `set`
- @param {String} key
- @param {Object} value
- @param {Object} options
 - options like {ttl: 100}
- @returns {Promise}

## get value
- `get`
- @param {String} key
- @returns {Promise}

## get value
- `remove`
- @param {String} key
- @returns {Promise}

## clear value
- `clear`
- @returns {Promise}



