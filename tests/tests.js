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
	
	QUnit.test("Verify that unmatched cardinal points return 'undefined'", function(assert) {
		assert.strictEqual(common.cardinalPoints.points["N"], 0, "N is a point");
		assert.strictEqual(common.cardinalPoints.points["SE"], undefined, "SE is not a point");
	});
});

require(["interface"], function(interface) {
	QUnit.module('interface', {
		setup: function() {

		}
	});

	QUnit.test('testInstructions()', function(assert) {
		assert.strictEqual(interface.testInstructions(""), false, "empty string is invalid");
		assert.strictEqual(interface.testInstructions("1 1 E \n RFRFRFRF"), false, "less than 3 lines is invalid");
		assert.strictEqual(interface.testInstructions("5 3 \n 1 1 E \n RFRFRFRF"), true, "3 or more lines is safe to try and process");
	});
});

require(["robotActions", "robot"], function(robotActions, robotObj) {
	var bot1, bot2, bot3, bot4, bot5;
	
	QUnit.module('robotActions', {
		setup: function() {
			bot1 = new robotObj.robot("bot 1", 1, 1, "E", true);
			bot2 = new robotObj.robot("bot 2", 3, 2, "N", true);
			bot3 = new robotObj.robot("bot 3", 0, 3, "W", true);
		}
	});

	QUnit.test('instructBot()', function(assert) {
		assert.strictEqual(robotActions.instructBot(bot1, "RFRFRFRF").toString(), "1 1 E", "Test: 1 1 E");
		assert.strictEqual(robotActions.instructBot(bot2, "FRRFLLFFRRFLL").toString(), "3 3 N LOST", "Test: 3 2 N");
		assert.strictEqual(robotActions.instructBot(bot3, "LLFFFLFLFL").toString(), "2 3 S", "Test: 0 3 W");
	});
	
	QUnit.module('robot()', {
		setup: function() {
			bot4 = new robotObj.robot("bot 4", 0, 3, "W", true);
			bot5 = new robotObj.robot("bot 5", 0, 3, "W", "random string");
		}
	});
		
	QUnit.test('Test Robot Object', function(assert) {
		assert.strictEqual(bot4.isAliveStr(), "", "If isAlive property is true then the isAliveStr property returns an empty string");
		
		bot4.isAlive = false;
		assert.strictEqual(bot4.isAliveStr(), " LOST", "If isAlive property is false then the isAliveStr property returns 'LOST'");
		
		bot4.isAlive = "random string";
		assert.strictEqual(bot4.isBotValid(), false, "Passing a string to 'isAlive' property should make the bot invalid");
		
		assert.strictEqual(bot5.isAlive, true, "Passing a string to 'isAlive' in the constructor should default it to true");
	});
});