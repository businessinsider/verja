if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('minlength validation rule', function() {

	var schema = {
		key: new verja.Field({minlength: 5})
	};


	it('string: should throw an error if it\'s under the min length', function(done) {
		verja.validators.minlength('so', 4, function(valid){
			if (!valid) { return done(); }
			throw 'minlength validator failed for under the min';
		});
	});

	it('string: should not throw an error if it\'s over the min length', function(done) {
		verja.validators.minlength('something', 4, function(valid){
			if (valid) { return done(); }
			throw 'minlength validator failed for over the min';
		});
	});

	it('string: should not throw an error if it\'s same as the min length', function(done) {
		verja.validators.minlength('some', 4, function(valid){
			if (valid) { return done(); }
			throw 'minlength validator failed for same as the min';
		});
	});

	it('array: should throw an error if it\'s under the min length', function(done) {
		verja.validators.minlength([1,2], 4, function(valid){
			if (!valid) { return done(); }
			throw 'minlength validator failed for under the min';
		});
	});

	it('array: should not throw an error if it\'s over the min length', function(done) {
		verja.validators.minlength([1,2,3,4,5], 4, function(valid){
			if (valid) { return done(); }
			throw 'minlength validator failed for over the min';
		});
	});

	it('array: should not throw an error if it\'s same as the min length', function(done) {
		verja.validators.minlength([1,2,3,4], 4, function(valid){
			if (valid) { return done(); }
			throw 'minlength validator failed for same as the min';
		});
	});

	it('should fail if not an array or string', function(done) {
		verja.validators.minlength({}, 4, function(valid){
			if (!valid) { return done(); }
			throw 'non-array/string failure';
		});
	});
});