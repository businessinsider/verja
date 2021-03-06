if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe ('url validation rule', function() {
	it ('should tell if a given string is a url', function(done) {
		verja.validators.url('http://www.businessinsider.com', true, function(valid) {
			if (valid) { return done(); }
			throw new Error('valid url failed');
		});
	});

	it ('should start the url regex at the beginning of the string', function(done) {
		verja.validators.url('xxxxxxxhttp://www.businessinsider.com', true, function(valid) {
			if (!valid) { return done(); }
			throw new Error('valid url failed');
		});
	});

	it ('should tell if a given string is a url', function(done) {
		verja.validators.url('globsting', true, function(valid) {
			if (!valid) { return done(); }
			throw new Error('invalid url failed');
		});
	});

	it ('should pass on falsy values', function(done) {
		verja.validators.url(null, true, function(valid) {
			if (valid) { return done(); }
			throw new Error('falsy null url failed');
		});
	});
	
	it ('should not throw an error on an empty string', function(done) {
		verja.validators.url('', true, function(valid) {
			if (valid) { return done(); }
			throw new Error('empty string url invalid');
		});
	});

	it ('should not throw a false positive for a url of all spaces', function(done) {
		verja.validators.url('          ', true, function(valid) {
			if (!valid) { return done(); }
			throw new Error('blank url url failed');
		});
	});

	it ('should report an error if an input given is not a string', function(done) {
		verja.validators.url(4, true, function(valid) {
			if (!valid) { return done(); }
			throw new Error('non-string failed');
		});
	});

	it ('should report an error if it is given the string ..com', function(done) {
		verja.validators.url('..com', true, function(valid) {
			if (!valid) { return done(); }
			throw new Error('non-string failed');
		});
	});
});