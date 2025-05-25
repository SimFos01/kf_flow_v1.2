const test = require('node:test');
const assert = require('node:assert');
const Module = require('module');

function createRes() {
  return {
    statusCode: undefined,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return { json: payload => { this.body = payload; } };
    },
    json(payload) { this.body = payload; }
  };
}

const originalRequire = Module.prototype.require;

function withStubs(stubs, fn) {
  Module.prototype.require = function(path) {
    if (path in stubs) return stubs[path];
    return originalRequire.apply(this, arguments);
  };
  delete require.cache[require.resolve('../controllers/lockController')];
  try { return fn(); } finally { Module.prototype.require = originalRequire; }
}

test('openLock denies access when hasAccessToLock is false', async () => {
  await withStubs({
    '../utils/accessControl': {
      hasAccessToLock: async () => false,
      logAccess: async () => {}
    },
    '../config/db': { query: async () => [] },
    '../adapters/raspberryAdapter': {},
    '../adapters/aviorAdapter': {}
  }, async () => {
    const { openLock } = require('../controllers/lockController');
    const req = { params: { id: 1 }, user: { id: 10 } };
    const res = createRes();
    await openLock(req, res);
    assert.strictEqual(res.statusCode, 403);
    assert.deepStrictEqual(res.body, { error: 'Ingen tilgang til denne låsen' });
  });
});

test('lockLock denies access when hasAccessToLock is false', async () => {
  await withStubs({
    '../utils/accessControl': {
      hasAccessToLock: async () => false,
      logAccess: async () => {}
    },
    '../config/db': { query: async () => [] },
    '../adapters/raspberryAdapter': {},
    '../adapters/aviorAdapter': {}
  }, async () => {
    const { lockLock } = require('../controllers/lockController');
    const req = { params: { id: 1 }, user: { id: 10 } };
    const res = createRes();
    await lockLock(req, res);
    assert.strictEqual(res.statusCode, 403);
    assert.deepStrictEqual(res.body, { error: 'Ingen tilgang til denne låsen' });
  });
});
