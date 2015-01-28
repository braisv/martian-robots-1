module('robotActions', {
  setup: function() {
//    robotActions.defaults.yBounds = 2; // changing x or y bounds from the default fails all the tests with the current criteria
		require(["common"], function(common) {
//			var defaults = new common.defaults(5,3,50,100);	
		});
  }
});

require(["robotActions"], function(robotActions) {
	QUnit.test('instructBot()', function(assert) {
		assert.strictEqual(robotActions.instructBot("bot1", "1 1 E", "RFRFRFRF"), "1 1 E", "Test: 1 1 E");
		assert.strictEqual(robotActions.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"), "3 3 N LOST", "Test: 3 2 N");
		assert.strictEqual(robotActions.instructBot("bot3", "0 3 W", "LLFFFLFLFL"), "2 3 S", "Test: 0 3 W");
	});
});

module('common', {
  setup: function() {
//    robotActions.defaults.yBounds = 2; // changing x or y bounds from the default fails all the tests with the current criteria
		
  }
});

require(["common"], function(common) {
	QUnit.test('isNumber()', function(assert) {
		assert.strictEqual(common.isNumber(null), false, "Null test");
		assert.strictEqual(common.isNumber(undefined), false, "undefined test");
		assert.strictEqual(common.isNumber("undefined"), false, "string test");
		assert.strictEqual(common.isNumber(16), true, "actual number");
	});
});