if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('max validation rule', function() {
	it('should throw an error if it\'s over the max', function(done) {
		verja.validators.max(5, 3, function(valid){
			if (!valid) { return done(); }
			throw 'max validator failed for over the max';
		});
	});

	it ('should not throw an error if it\'s under the max', function(done) {
		verja.validators.max(2, 3, function(valid){
			if (valid) { return done(); }
			throw 'max validator failed for under the max';
		});
	});

	it ('should not throw an error if it\'s the same as max', function(done) {
		verja.validators.max(3, 3, function(valid){
			if (valid) { return done(); }
			throw 'max validator failed for the same as max';
		});
	});

	it ('should fail if not number', function(done) {
		verja.validators.max('some string', 3, function(valid){
			if (!valid) { return done(); }
			throw 'max validator failed for not a number';
		});
	});
});