require(["common"], function(common) {
	QUnit.module('common', {
		setup: function() {

		}
	});

	QUnit.test('isNumber()', function(assert) {
		assert.strictEqual(common.isNumber(null), false, "Null test");
		assert.strictEqual(common.isNumber(undefined), false, "undefined test");
		assert.strictEqual(common.isNumber("undefined"), false, "string test");
		assert.strictEqual(common.isNumber(16), true, "actual number");
		assert.strictEqual(common.isNumber(0), false, "number less than one");
	});
});

require(["interface"], function(interface) {
	QUnit.module('interface', {
		setup: function() {

		}
	});

	QUnit.test('testInstructions()', function(assert) {
		assert.strictEqual(interface.testInstructions(""), false, "empty string is invalid");
		
		var inputStr = "1 1 E \n RFRFRFRF";
		assert.strictEqual(interface.testInstructions(inputStr), false, "less than 3 lines is invalid");
		
		inputStr = "5 3 \n 1 1 E \n RFRFRFRF";
		assert.strictEqual(interface.testInstructions(inputStr), true, "3 or more lines is safe to try and process");
	});
});

require(["robotActions"], function(robotActions) {
	QUnit.module('robotActions', {
		setup: function() {
			
		}
	});

	QUnit.test('instructBot()', function(assert) {
		assert.strictEqual(robotActions.instructBot("bot1", "1 1 E", "RFRFRFRF"), "1 1 E", "Test: 1 1 E");
		assert.strictEqual(robotActions.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"), "3 3 N LOST", "Test: 3 2 N");
		assert.strictEqual(robotActions.instructBot("bot3", "0 3 W", "LLFFFLFLFL"), "2 3 S", "Test: 0 3 W");
	});
});