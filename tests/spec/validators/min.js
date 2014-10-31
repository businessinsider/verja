if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('min validation rule', function() {
	it('should throw an error if it\'s under the min', function(done) {
		verja.validators.min(2, 3, function(valid){
			if (!valid) { return done(); }
			throw 'min validator failed for under the min';
		});
	});

	it ('should not throw an error if it\'s over the min', function(done) {
		verja.validators.min(4, 3, function(valid){
			if (valid) { return done(); }
			throw 'min validator failed for over the min';
		});
	});

	it ('should not throw an error if it\'s the same as min', function(done) {
		verja.validators.min(3, 3, function(valid){
			if (valid) { return done(); }
			throw 'min validator failed for the same as min';
		});
	});

	it ('should fail if not number', function(done) {
		verja.validators.min('some string', 3, function(valid){
			if (!valid) { return done(); }
			throw 'min validator failed for not a number';
		});
	});
});