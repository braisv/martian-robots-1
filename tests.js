module('botModule', {
  setup: function() {
//    botModule.defaults.yBounds = 2; // changing x or y bounds from the default fails all the tests with the current criteria
  }
});

QUnit.test('instructBot()', function(assert) {
  assert.strictEqual(botModule.instructBot("bot1", "1 1 E", "RFRFRFRF"), "1 1 E", "Test: 1 1 E");
  assert.strictEqual(botModule.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"), "3 3 N LOST", "Test: 3 2 N");
  assert.strictEqual(botModule.instructBot("bot3", "0 3 W", "LLFFFLFLFL"), "2 3 S", "Test: 0 3 W");
});