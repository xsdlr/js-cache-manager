jest.unmock('../src/index');
import Cache from '../src/index';
import defaults from '../src/defaults';

describe('test memory cache', () => {
  let cache, key, value;
  beforeAll(() => {
    key = 'test';
    value = { test: 123 };
  });

  beforeEach(() => {
    cache = new Cache();
  });

  afterEach(() => {
    cache = null;
  });

  test('cache isInstansof Cache', () => {
    expect(cache).toBeInstanceOf(Cache);
  });

  test('default options', () => {
    expect(cache.options).toEqual(defaults);
  });

  test('set value', async() => {
    await cache.set(key, value);
    const v = await cache.adaptor.get(key);
    expect(cache._ttl[key]).toBeGreaterThan(Date.now());
    expect(v).toEqual(value);
  });

  test('get value', async() => {
    await cache.set(key, value);
    expect(await cache.get(key)).toEqual(value);
    expect(cache._ttl[key]).toBeGreaterThan(Date.now());
  });

  test('remove value', async() => {
    await cache.set(key, value);
    expect(await cache.get(key)).toEqual(value);
    expect(cache._ttl[key]).toBeGreaterThan(Date.now());
    await cache.remove(key);
    expect(await cache.get(key)).toBeUndefined();
    expect(cache._ttl[key]).toBeUndefined();
  });

  test('clear', async() => {
    await cache.set(key, value);
    expect(cache._ttl[key]).toBeGreaterThan(Date.now());
    await cache.clear();
    expect(cache._ttl).toEqual({});
  });

  test('expire', async(done) => {

    await cache.set(key, value, { ttl: 10 });
    expect(await cache.get(key)).toEqual(value);
    expect(cache._ttl[key]).toBeGreaterThan(Date.now());

    setTimeout(async () => {
      try {
        expect(await cache.get(key)).toBeUndefined();
        expect(cache._ttl[key]).toBeUndefined();
        done()
      } catch (err) {
        done.fail(err)
      }
    }, 20);
  });
});
