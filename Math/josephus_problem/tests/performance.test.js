const assert = require('assert');
const { lastBy1Splice, lastBy1Math, lastBy1Binary, josephusClassic } = require('../index');

function logPass(name) { console.log(`PASS: ${name}`); }
function logFail(name, err) { console.error(`FAIL: ${name} -> ${err.message}`); }
function test(name, fn) { try { fn(); logPass(name); } catch (e) { logFail(name, e); } }

function time(fn) {
  const t0 = process.hrtime.bigint();
  const result = fn();
  const t1 = process.hrtime.bigint();
  const ms = Number(t1 - t0) / 1e6;
  return { ms, result };
}

// Performance: mathematical solution should be faster than splice simulation

test('Performance: lastBy1Math faster than lastBy1Splice for n=2000', () => {
  const n = 2000;
  const A = time(() => lastBy1Splice(n, 1, false));
  const B = time(() => lastBy1Math(n, 1, false));
  // Allow some headroom; math should be markedly faster
  assert.ok(B.ms < A.ms, `Math ${B.ms.toFixed(2)}ms vs Splice ${A.ms.toFixed(2)}ms`);
});

test('Performance: lastBy1Binary faster than lastBy1Splice for n=2000', () => {
  const n = 2000;
  const A = time(() => lastBy1Splice(n, 1, false));
  const B = time(() => lastBy1Binary(n, 1, false));
  // Binary should be as fast or faster than math
  assert.ok(B.ms < A.ms, `Binary ${B.ms.toFixed(2)}ms vs Splice ${A.ms.toFixed(2)}ms`);
});

test('Performance: lastBy1Binary runs under 10ms for n=200000', () => {
  const n = 200000;
  const t = time(() => lastBy1Binary(n, 1, false));
  assert.ok(t.ms < 10, `Binary took ${t.ms.toFixed(2)}ms`);
});

test('Performance: josephusClassic runs under 100ms for n=200000', () => {
  const n = 200000;
  const t = time(() => josephusClassic(n, 1));
  assert.ok(t.ms < 100, `Classic took ${t.ms.toFixed(2)}ms`);
});

console.log('\nPerformance tests completed.');
