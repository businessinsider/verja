'use strict';

if (typeof require !== 'undefined') {
	var assert = require('assert');
	var verja = require('../../verja.js');
} else {
	var assert = {
		equal: function(a1, a2) {
			if (a1 !== a2) {
				throw new Error();
			}
		},
		notEqual: function(a1, a2) {
			if (a1 === a2) {
				throw new Error();
			}
		}
	};
}

describe('verja API', function() {
	describe('addValidator', function() {

		it('addValidator adds a validator', function() {
			verja.addValidator('haskey', function(val, config, callback) {
				return callback(false);
			});

			assert.equal(true, !!verja.validators.haskey);
		});

		it('makes this array thing work how i want', function() {
			verja.addValidator('isntArray', function(val, config, callback) {
				if (Array.isArray(val)) return callback(true);
				return callback(false);
			});
			var schema = {
				key: new verja.Field({
					isntArray: true
				}),
				key2: new verja.Field({
					isntArray: true
				})
			};
			var obj = {
				key: 'not an array!',
				key2: ['clearly an array!']
			};

			verja.validate(obj, schema, function(err) {
				assert.equal(JSON.stringify(err), '{\"key\":{\"isntArray\":true},\"key2\":{}}');
			});

		});

		it('should work with an async validator', function(done) {
			verja.addValidator('async', function(val, config, callback) {
				setTimeout(function() {
					callback(false);
				}, 10);
			});

			verja.validate({
				a: {
					async: 'adfafd'
				}
			}, {
				a: new verja.Field({
					async: true
				})
			}, function(e) {
				if (e) {
					return done();
				}
				throw 'Async validators dont work';
			});
		});

	});

	describe('Field', function() {

		var obj = {
			key: 'value'
		};
		var field = new verja.Field(obj);

		it('the Field constructor should return an object with the same properties', function() {
			assert.equal(obj.key, field.key);
		});

		it('the Field constructor should not return the same object', function() {
			assert.notEqual(obj, field);
		});

		it('should be able to check if a field is an instance of Field', function() {
			assert.equal(field instanceof verja.Field, true);
		});

	});

	describe('validate', function() {

		var goodNest = {
			key: {
				str: 'value',
				obj: {}
			},
			key2: true
		};

		var badNest = {
			key: {
				str: [],
				obj: null
			}
		};

		var nestSchema = {
			key: {
				str: new verja.Field({
					type: 'string'
				}),
				obj: new verja.Field({
					type: 'object'
				})
			},
			key2: new verja.Field({
				required: true,
				type: 'boolean'
			})
		};

		it('should validate an array\'s members', function(done) {
			var objArr = {
				key: ['string', {}]
			};
			var arrSch = {
				key: new verja.Field({
					itemSchema: new verja.Field({
						type: 'string'
					})
				})
			};
			verja.validate(objArr, arrSch, function(e) {
				assert.equal(JSON.stringify(e), JSON.stringify({
					key: {
						0: {},
						1: {
							type: true
						}
					}
				}));
				done();
			});
		});

		it('should validate an array\'s members and the array itself', function(done) {
			var objArr = {
				key: ['string', {}]
			};
			var arrSch = {
				key: new verja.Field({
					itemSchema: new verja.Field({
						type: 'string'
					}),
					minlength: 5
				})
			};
			verja.validate(objArr, arrSch, function(e) {
				assert.equal(JSON.stringify(e), JSON.stringify({
					key: {
						0: {},
						1: {
							type: true
						},
						minlength: true
					}
				}));
				done();
			});
		});

		it('should validate a primative', function(done) {
			verja.validate('some string', new verja.Field({
				type: 'string'
			}), function(e) {
				if (e) {
					throw e;
				}
				done();
			});
		});

		it('should validate simple nested objects and return null for errors in the callback', function(done) {
			verja.validate(goodNest, nestSchema, function(e) {
				if (e !== null) {
					throw e;
				}
				done();
			});
		});

		it('should validate simple nested objects (invalid example)', function() {
			var errObj;
			verja.validate(badNest, nestSchema, function(e) {
				errObj = e;
			});

			assert.equal(errObj.key.str.type, true);
			assert.equal(errObj.key.obj.type, true);
		});

		if ('should not fail if there is an array property on the schema but no array is passed in the object', function(done) {
			verja.validate({}, {
				someprop: new verja.Field({
					type: 'array',
					itemSchema: new verja.Field({})
				})
			}, function(err) {
				if (!err) { return done(); }
				throw new Error('failed for array property on schema but no array in object');
			});
		});

		it('should not modify the schema', function(done) {
			var s = {someprop: new verja.Field({type: 'array', itemSchema: new verja.Field({})})};
			verja.validate({}, s, function(){
				if (JSON.stringify(s) !== '{"someprop":{"type":"array","itemSchema":{}}}') {
					throw new Error('modified the schema, bad, very bad.');
				}
				done();
			});
		});

	});

	describe('strip', function() {

		it('should strip empty objects from a simple object', function(done) {
			var obj = {
				key: {},
				key2: 'value'
			};
			if (JSON.stringify(verja.strip(obj)) !== '{"key2":"value"}') {
				throw err;
			} else {
				return done();
			}
		});

		it('should strip empty objects from a nested object', function(done) {
			var obj = {
				key: {},
				key2: 'value',
				key3: {
					key4: {}
				}
			};
			if (JSON.stringify(verja.strip(obj)) === '{"key2":"value"}') {
				return done();
			} else {
				throw JSON.stringify(verja.strip(obj));
			}
		});

		it('should do nothing to an empty object', function(done) {
			var obj = new Object();
			if (JSON.stringify(verja.strip(obj)) !== "{}") {
				throw err;
			} else {
				done();
			}
		});

	});

});