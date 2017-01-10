if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}

describe('hasCapitalLetter', function() {
	it('should tell if a given string has a capital letter', function(done) {
		var x = 'PASSWORD';
		verja.validators.hasCapitalLetter(x, true, function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' has no capital letter;');
		});
	});

	it('should tell if a given string does not have a capital letter', function(done) {
		var x = 'password';
		verja.validators.hasCapitalLetter(x, true, function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' has no capital letter;');
		});
	});

	it('should accept false as a config value', function(done) {
		var x = 'password';
		verja.validators.hasCapitalLetter(x, false, function(valid) {
			if (valid) {
				return done();
			}
			throw new Error(x + ' has no capital letter;');
		});
	});

	it('should fail if the input is not a string', function(done) {
		var x = [];
		verja.validators.hasCapitalLetter(x, true, function(valid) {
			if (!valid) {
				return done();
			}
			throw new Error(x + ' has no lowercase letter;');
		});
	});

});