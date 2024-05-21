/**
 * 
 * @param {InfoCondamne[]} list Liste
 * @returns 
 */
function countAlives(list) {
  var alives = 0;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item.killed) { alives++ }
  }
  return alives;
}
/**
 * 
 * @param {InfoCondamne[]} list Liste
 * @param {num} num Numero Condamne
 * @returns 
 */
function findNUM(list, num) {
  return list.findIndex(item => item.num === num);
}

function findNextAlive(list, index) {
  var len = list.length, i = index % len;
  while (list[(i + 1) % len].killed) { i++; } i++;
  return i % len;
}
function findNextNAlives(list, N, index) {
  var listIndexes = [];
  var len = list.length, i = index % len;
  while (listIndexes.length < N) {
    while (list[(i + 1) % len].killed) { i++; }
    i++; listIndexes.push(i % len);
  }
  return listIndexes;
}
function powerTwo(nombe) {
  var power = 1, pw = 2 ** power;
  while (nombe >= pw) { pw *= 2; power++; }
  return 2 ** (power - 1) + " < " + nombe + " < " + 2 ** power;
}
function powN(n, m = 2) {
  var pw = 1, p = 0;
  while (n >= pw) { pw *= m; p++; }
  return p - 1;
}
function pow2(n) {
  var pw = 1, p = 0;
  while (n >= pw) { pw *= 2; p++; }
  return p;
}
function powm(n, m = 2) {
  var pw = 1, p = 0, i = 0;
  while (n >= pw) { pw *= m; p++; }
  var borne_inf = m ** (p - 1);
  while (borne_inf <= n) { borne_inf += m ** (p - 1); i++; }
  return [p - 1, i, p];
}
function rand(Min, Max) {
  return Math.round((Max - Min) * Math.random() + Min);
}
function generate(n, desc) {
  var dsc = descendant(!!desc);
  return [...Array(n)].map((_, i) => (n + 1) * desc + dsc * (i + 1));
}
function generateListJSON(n, desc) {
  var dsc = descendant(!!desc);
  return [...Array(n)].map(function (_, i) { return new InfoCondamne((n + 1) * desc + dsc * (i + 1)) });;
}
class InfoCondamne { 
  /**
   * 
   * @param {number} numero Number
   */
  constructor(numero){
    this.num = numero
    this.killed = false
    this.kills = 0
    this.killedBy = null
    this.killedRound = null
  }
}
function descendant(b) {
  return 1 - 2 * b;
}
module.exports = {
  countAlives,
  findNUM,
  findNextAlive,
  findNextNAlives,
  powerTwo,
  pow2,
  powm,
  rand,
  generate,
  generateListJSON,
  descendant,
  InfoCondamne,
  powN,
}