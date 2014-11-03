if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}
describe('itemSchema validation rule', function() {

	var obj = {key: []};
	var schema = {
		key: new verja.Field({
			minlength: 2,
			itemSchema: new verja.Field({
				type: 'string'
			})
		})
	};

	it ('should throw an error if there\'s a problem with the array', function(done) {
		verja.validate(obj, schema, function(e) {
			if (e) return done();
			throw e;
		});
	});

	it ('should not throw an error if there are no problems with the array members', function(done) {
		obj.key.push('string', 'another string');
		verja.validate(obj, schema, function(e) {
			if (!e) return done();
		});
	});

	it ('should throw an error if there\'s a problem with an array member', function(done) {
		obj.key.push([]);
		verja.validate(obj, schema, function(e) {
			if (e) return done();
			throw e;
		});
	});

});