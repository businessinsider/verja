if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('type validation rule', function() {
	//need to fix the lib to return null for no errors so this works
	describe ('type: string', function() {
		it('Should not throw an error when a string is passed and type is string', function(done){
			verja.validators.type('some random string', 'string', function(valid){
				if (valid) { return done(); }
				throw 'Type validator failed for valid string';
			});
		});

		it('Should throw an error when a non-string is passed and type is string', function(done){
			verja.validators.type([], 'string', function(valid){
				if (!valid) { return done(); }
				throw 'Type validator failed for invalid string';
			});
		});

	});
	describe('type: array', function() {

		it('Should not throw an error when a array is passed and type is array', function(done){
			verja.validators.type(['somearray'], 'array', function(valid){
				if (valid) { return done(); }
				throw 'Type validator failed for valid array';
			});
		});

		it('Should throw an error when a non-array is passed and type is array', function(done){
			verja.validators.type('some string', 'array', function(valid){
				if (!valid) { return done(); }
				throw 'Type validator failed for invalid array';
			});
		});
	});
	describe ('type: number', function() {
		it('Should not throw an error when a number is passed and type is number', function(done){
			verja.validators.type(3.123, 'number', function(valid){
				if (valid) { return done(); }
				throw 'Type validator failed for valid number';
			});
		});

		it('Should throw an error when a non-number is passed and type is number', function(done){
			verja.validators.type('some string', 'number', function(valid){
				if (!valid) { return done(); }
				throw 'Type validator failed for invalid number';
			});
		});
	});

	describe ('type: date', function() {
		it('Should not throw an error when a date is passed and type is date', function(done){
			verja.validators.type(new Date(), 'date', function(valid){
				if (valid) { return done(); }
				throw 'Type validator failed for valid date';
			});
		});

		it('Should throw an error when a non-date is passed and type is date', function(done){
			verja.validators.type('some string', 'date', function(valid){
				if (!valid) { return done(); }
				throw 'Type validator failed for invalid date';
			});
		});
	});

	describe ('type: object', function() {
		it('Should not throw an error when a object is passed and type is object', function(done){
			verja.validators.type({}, 'object', function(valid){
				if (valid) { return done(); }
				throw 'Type validator failed for valid object';
			});
		});

		it('Should throw an error when a non-object is passed and type is object', function(done){
			verja.validators.type('some string', 'object', function(valid){
				if (!valid) { return done(); }
				throw 'Type validator failed for invalid object';
			});
		});
	});

	describe ('type: regexp', function() {
		it('Should not throw an error when a regexp is passed and type is regexp', function(done){
			verja.validators.type(/[a]/, 'regexp', function(valid){
				if (valid) { return done(); }
				throw 'Type validator failed for valid regexp';
			});
		});

		it('Should throw an error when a non-regexp is passed and type is regexp', function(done){
			verja.validators.type('some string', 'regexp', function(valid){
				if (!valid) { return done(); }
				throw 'Type validator failed for invalid regexp';
			});
		});
	});
});