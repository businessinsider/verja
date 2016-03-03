if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('maxlength validation rule', function() {

	it('string: should throw an error if it\'s over the max length', function(done) {
		verja.validators.maxlength('some long error', 4, function(valid){
			if (!valid) { return done(); }
			throw 'maxlength validator failed for over the max';
		});
	});

	it('string: should not throw an error if it\'s under the max length', function(done) {
		verja.validators.maxlength('som', 4, function(valid){
			if (valid) { return done(); }
			throw 'maxlength validator failed for under the max';
		});
	});

	it('string: should not throw an error if it\'s same as the max length', function(done) {
		verja.validators.maxlength('some', 4, function(valid){
			if (valid) { return done(); }
			throw 'maxlength validator failed for same as the max';
		});
	});

	it('array: should throw an error if it\'s over the max length', function(done) {
		verja.validators.maxlength([1,2,3,4,5], 4, function(valid){
			if (!valid) { return done(); }
			throw 'maxlength validator failed for over the max';
		});
	});

	it('array: should not throw an error if it\'s under the max length', function(done) {
		verja.validators.maxlength([1,2,3], 4, function(valid){
			if (valid) { return done(); }
			throw 'maxlength validator failed for under the max';
		});
	});

	it('array: should not throw an error if it\'s same as the max length', function(done) {
		verja.validators.maxlength([1,2,3,4], 4, function(valid){
			if (valid) { return done(); }
			throw 'maxlength validator failed for same as the max';
		});
	});

	it('an empty array should pass', function(done) {
		verja.validators.maxlength([], 4, function(valid){
			if (valid) { return done(); }
			throw 'empty array failure';
		});
	});

	it('should fail if not an array or string', function(done) {
		verja.validators.maxlength({}, 4, function(valid){
			if (!valid) { return done(); }
			throw 'non-array/string failure';
		});
	});

	it('should fail if not an array or string', function(done) {
		verja.validators.maxlength(null, 4, function(valid){
			if (!valid) { return done(); }
			throw 'falsy failure';
		});
	});
});