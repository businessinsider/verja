if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}

describe('hasNumber', function() {
	it('should tell if a given string has a number', function(done) {
		var x = 'password123';
		verja.validators.hasNumber(x, true, function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' has no number');
		});
	});

	it('should tell if a given does not have a number', function(done) {
		var x = 'PASSWORD';
		verja.validators.hasNumber(x, true, function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' has no number');
		});
	});

	it('should work with config set to false to check that there is not a number in the string', function(done) {
		var x = 'PASSWORD';
		verja.validators.hasNumber(x, false, function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' has no number');
		});
	});

	it('should fail if the input is not a string', function(done) {
		var x = [];
		verja.validators.hasNumber(x, true, function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' has no number');
		});
	});

});