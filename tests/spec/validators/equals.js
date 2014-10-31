if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('equals validation rule', function() {
	it ('should pass when a string is equal', function(done) {
		verja.validators.equals('some', 'some', function(valid){
			if (valid) { return done(); }
			throw new Error('failed valid string');
		});
	});

	it ('should fail when a string is not equal', function(done) {
		verja.validators.equals('some', 'some other', function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid string');
		});
	});

	it ('should pass when a number is equal', function(done) {
		verja.validators.equals(6, 6, function(valid){
			if (valid) { return done(); }
			throw new Error('failed valid number');
		});
	});

	it ('should fail when a number is not equal', function(done) {
		verja.validators.equals(6, 7, function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid number');
		});
	});

	it ('should pass when a boolean is equal', function(done) {
		verja.validators.equals(true, true, function(valid){
			if (valid) { return done(); }
			throw new Error('failed valid boolean');
		});
	});

	it ('should fail when a boolean is not equal', function(done) {
		verja.validators.equals(true, false, function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid boolean');
		});
	});

	var obj = {};
	it ('should pass when a object is the same', function(done) {
		verja.validators.equals(obj, obj, function(valid){
			if (valid) { return done(); }
			throw new Error('failed valid object');
		});
	});

	it ('should fail when a object is not equal', function(done) {
		verja.validators.equals(obj, {}, function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid object');
		});
	});

	it ('should fail for incompatable types', function(done) {
		verja.validators.equals('5', 5, function(valid){
			if (!valid) { return done(); }
			throw new Error('failed invalid types');
		});
	});

});