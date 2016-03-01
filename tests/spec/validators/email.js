if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe ('email validation rule', function() {
	it ('should tell if a given string is an email', function(done) {
		verja.validators.email('falmasi@businessinsider.com', true, function(valid){
			if (valid) { return done(); }
			throw new Error('failed valid email validation');
		});
	});

	it ('should tell if a given string is not an email', function(done) {
		verja.validators.email('falmasi//businessinsider.com', true, function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid email validation');
		});
	});

	it ('should report an error if an input given is not a string', function(done) {
		verja.validators.email(454544, true, function(valid){
			if (!valid) { return done(); }
			throw new Error('failed non-string input');
		});
	});

	it ('should do nothing for falsy values', function(done) {
		verja.validators.email(null, true, function(valid){
			if (valid) { return done(); }
			throw new Error('failed falsy input');
		});
	});

});