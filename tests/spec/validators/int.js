if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('int validation rule', function() {

	var schema = {
		key: new verja.Field({int: true})
	};

	it ('should confirm that a number is an integer', function(done) {
		verja.validators.int(5,true,function(valid){
			if (valid) { return done(); }
			throw new Error('failed valid integer');
		})
	});

	it ('should fail on a float', function(done) {
		verja.validators.int(5.13,true,function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid integer');
		})
	});

	it ('should fail for non-numbers', function(done) {
		verja.validators.int('5',true,function(valid){
			if (!valid) { return done(); }
			throw new Error('failed non-number');
		})
	});

});