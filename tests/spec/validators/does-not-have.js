if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}

describe('doesNotHave', function() {

	it('should fail if a given string contains a member of a given array', function(done) {
		var x = 'abc';
		verja.validators.doesNotHave(x, ['a', 'xyz', 'g'], function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' does not have a listed character');
		});
	});

	it('should fail if a given string contains another given string', function(done) {
		var x = 'abc';
		verja.validators.doesNotHave(x, 'a', function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' does not have a');
		});
	});

	it('should pass if a given string does not contain a given character', function(done) {
		var x = 'abc';
		verja.validators.doesNotHave(x, ['z'], function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' has a listed character');
		});
	});

	it('should accept an array with a string to look for', function(done) {
		var x = ['abc', 123];
		verja.validators.doesNotHave(x, 'abc', function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' array has abc');
		});
	});

	it('should accept an array as a thing to look through and an array as a forbidden member list', function(done) {
		var x = ['abc', 123];
		verja.validators.doesNotHave(x, ['xyz','abc'], function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' array has abc');
		});
	});

	it('should pass given an array that does not contain members of another array', function(done) {
		var x = ['def', 123];
		verja.validators.doesNotHave(x, ['xyz','abc'], function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' array has abc');
		});
	});
});
