if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('required validation rule', function() {
	it('should pass if the property is truthy', function(done) {
		verja.validators.required('some filled in value', true, function(valid) {
			if (valid) return done();
			throw 'Required validator failed for valid property';
		});
	});

	it('should fail if the value is undefined', function(done) {
		verja.validators.required(undefined, true, function(valid) {
			if (!valid) return done();
			throw 'Required validator failed for undefined property';
		});
	});

	it('should pass if the value is 0', function(done) {
		verja.validators.required(0, true, function(valid) {
			if (!valid) return done();
			throw 'Required validator failed for 0';
		});
	});

	it('should pass if the value is false', function(done) {
		verja.validators.required(false, true, function(valid) {
			if (!valid) return done();
			throw 'Required validator failed for false';
		});
	});

	it('should fail if its an empty string', function(done) {
		verja.validators.required('', true, function(valid) {
			if (!valid) return done();
			throw 'Required validator failed for empty string';
		});
	});

	it('should not pass on something null', function(done) {
		verja.validators.required(null, true, function(valid) {
			if (!valid) return done();
			throw 'Required validator failed for invalid property';
		});
	});

	it('should always pass if config is false', function(done){
		verja.validators.required(null, false, function(valid){
			if (valid) { return done(); }
			throw 'Required validator failed for false config';
		});
	});
});