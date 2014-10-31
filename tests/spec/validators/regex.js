if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('regex validation rule', function() {
	it('should find an index in a string based on a string input', function(done) {
		verja.validators.regex('value', 'val', function(valid){
			if (valid) { return done(); }
			throw new Error('failed string regex');
		});
	});

	it ('should not pass if the regex config is not present', function(done) {
		verja.validators.regex('somethingelse', 'val', function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid string regex');
		});
	});

	it ('should accept a regular expression as an argument', function(done) {
		verja.validators.regex('Val', /val/i, function(valid){
			if (valid) { return done(); }
			throw new Error('failed real regex');
		});
	});
});