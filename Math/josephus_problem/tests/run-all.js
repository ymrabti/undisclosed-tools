// Run all test suites sequentially
require('./unit.test');
require('./integration.test');
require('./system.test');
require('./performance.test');
require('./usability.test');
require('./compatibility.test');

console.log('\nAll test suites executed.');
