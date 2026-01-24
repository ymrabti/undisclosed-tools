const assert = require('assert');
const {
  generateListJSON,
  countAlives,
  returnAlives,
  findNUM,
  findNextNAlives,
  InfosNum,
} = require('../helpers');
const { lastBy1JSON } = require('../index');

function logPass(name) { console.log(`PASS: ${name}`); }
function logFail(name, err) { console.error(`FAIL: ${name} -> ${err.message}`); }
function test(name, fn) { try { fn(); logPass(name); } catch (e) { logFail(name, e); } }

// System-level: simulate whole execution and validate invariants

test('System invariant: total kills = n - survivors', () => {
  const n = 30, start = 1;
  const { listComn } = lastBy1JSON(n, start, false);
  const totalKills = listComn.reduce((s, x) => s + x.kills, 0);
  const survivors = countAlives(listComn);
  assert.strictEqual(totalKills, n - survivors);
});

// Simulate general N elimination using helpers to validate survivors count
function simulateGeneralN(n, N, start = 1, desc = false) {
  const list = generateListJSON(n, desc);
  let lastAlive = start;
  while (countAlives(list) > N) {
    const i = findNUM(list, lastAlive);
    const nextAlives = findNextNAlives(list, N, i);
    nextAlives.forEach(idx => {
      list[i].kills += 1;
      list[idx].killed = true;
      list[idx].killedBy = lastAlive;
    });
    const next2 = findNextNAlives(list, 1, i)[0];
    lastAlive = list[next2].num;
  }
  return list;
}

test('System invariant: only N survivors remain for general N', () => {
  const n = 25, N = 3, start = 1;
  const listComn = simulateGeneralN(n, N, start, false);
  const survivors = returnAlives(listComn);
  assert.strictEqual(survivors.length, N);
});

test('System property: winner appears in list and has kills >= 0', () => {
  const n = 40, start = 1;
  const { lastAlive, listComn } = lastBy1JSON(n, start, false);
  const info = InfosNum(listComn, lastAlive);
  assert.ok(info);
  assert.ok(info.from_list >= 0);
});

console.log('\nSystem tests completed.');
