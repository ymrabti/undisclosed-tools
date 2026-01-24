const assert = require('assert');
const {
  generateListJSON,
  countAlives,
  findNUM,
  findNextAlive,
  InfosNum,
} = require('../helpers');
const {
  lastBy1JSON,
  lastBy1Splice,
  lastByNJSON,
  lastByNSplice,
  josephus,
  josephusGeneral,
} = require('../index');

function logPass(name) { console.log(`PASS: ${name}`); }
function logFail(name, err) { console.error(`FAIL: ${name} -> ${err.message}`); }
function test(name, fn) { try { fn(); logPass(name); } catch (e) { logFail(name, e); } }

// Verify JSON simulation fields align with splice survivor

test('lastBy1JSON survivor equals splice survivor', () => {
  const n = 15, start = 1;
  const json = lastBy1JSON(n, start, false);
  const splice = lastBy1Splice(n, start, false);
  assert.strictEqual(json.lastAlive, splice);
});

test('lastByNJSON survivor equals splice survivor for N=3', () => {
  const n = 18, start = 1, N = 3;
  const json = lastByNJSON(n, N, start, false);
  const splice = lastByNSplice(n, N, start, false);
  assert.strictEqual(json.lastAlive, splice.lastAlive);
});

// Check info aggregation via InfosNum

test('InfosNum reports consistent kills for winner', () => {
  const { listComn, lastAlive } = lastBy1JSON(20, 1, false);
  const info = InfosNum(listComn, lastAlive);
  assert.ok(info);
  assert.strictEqual(info.from_function, info.from_list);
});

// Integration with josephus unified API

test('josephus(m=2) equals lastBy1Splice for several n', () => {
  for (let n = 2; n <= 25; n++) {
    const got = josephus(n, 2, 1, 'forward');
    const expect = lastBy1Splice(n, 1, false);
    assert.strictEqual(got, expect);
  }
});

test('josephusGeneral equals lastByNSplice for selected N', () => {
  const cases = [
    { n: 8, N: 2 },
    { n: 12, N: 2 },
    { n: 15, N: 3 },
  ];
  for (const c of cases) {
    const expect = lastByNSplice(c.n, c.N, 1, false).lastAlive;
    const got = josephusGeneral(c.n, c.N, 1, 'forward');
    assert.strictEqual(got, expect);
  }
});

console.log('\nIntegration tests completed.');
