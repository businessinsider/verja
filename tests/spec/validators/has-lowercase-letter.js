if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}

describe('hasLowercaseLetter', function() {
	it('should tell if a given string has a lowercase letter', function(done) {
		var x = 'password';
		verja.validators.hasLowercaseLetter(x, true, function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' has no lowercase letter;');
		});
	});

	it('should tell if a given does not have a lowercase letter', function(done) {
		var x = 'PASSWORD';
		verja.validators.hasLowercaseLetter(x, true, function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' has no lowercase letter;');
		});
	});

	it('should work with config set to false to check that there is not a lowercase letter', function(done) {
		var x = 'PASSWORD';
		verja.validators.hasLowercaseLetter(x, false, function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' has no lowercase letter;');
		});
	});

	it('should fail if the input is not a string', function(done) {
		var x = 123;
		verja.validators.hasLowercaseLetter(x, true, function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' has no lowercase letter;');
		});
	});

});