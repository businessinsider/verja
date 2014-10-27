'use strict';

var assert = require('assert');
var verja = require('../verja.js');

describe('verja API', function() {
	
	describe('addValidator', function() {

		verja.addValidator('haskey', function(val) {
			if (!val) return true;
			return false;
		});

		var schema = {
			key: new verja.Field({haskey: true})
		};
		var obj = {};
		var errObj;

		verja.validate(obj, schema, function(err) {
			errObj = err;
		});

		it('addValidator adds a validator', function() {
			assert.equal(true, errObj.key.haskey);
		});

	});

	describe('Field', function() {

		var obj = {key: 'value'};
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

	describe('iterate', function() {


		it ('should iterate through the object', function() {
			var obj = {
				key: {},
				key2: {},
				key3: {}
			};
			var schema = {
				key: {
					str: new verja.Field(),
					obj: new verja.Field()
				},
				key2: new verja.Field(),
				key3: []
			};
			var returned = 0;
			verja.iterate(obj, schema, function(x){
				returned++;
			});
			assert.equal(returned, 3);
		});

		it('should handle members of an array', function() {
			var obj = {
				key: ['some string', {}, {}]
			};

			var schema = {
				key: [new verja.Field()],
			};
			var returned = 0;
			verja.iterate(obj, schema, function(x){
				returned++;
			});
			assert.equal(returned, 3);
		});

		it('fieldCallback should be optional', function() {
			var obj = {key: 'something'};
			var schema = {key: new verja.Field()};

			verja.iterate(obj, schema, null, function(){

			});

		});

		it('precursor should be optional', function() {
			var obj = {key: 'something'};
			var schema = {key: new verja.Field()};

			verja.iterate(obj, schema, function() {

			}, null);
		});

		it ('the precursor shold be called the correct number of times', function() {
			var obj = {
				key: ['some string', {}, {}],
				key2: 'string'
			};

			var schema = {
				key: [new verja.Field()],
				key2: new verja.Field(),
				key3: new verja.Field()
			};
			var returned = 0;
			verja.iterate(obj, schema, null, function() {
				returned++;
			});

			assert.equal(returned, 6);
		});

		it ('should throw an error if a schema is not passed', function(done) {
			var obj = {key: 'something'};
			var schema = {key: new verja.Field()};

			verja.iterate(obj, null, null, null, function(err){
				done();
			});
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
				str: new verja.Field({type: 'string'}),
				obj: new verja.Field({type: 'object'})
			},
			key2: new verja.Field({required: true, type: 'boolean'})
		};

		it('should validate an array', function(done) {
			var objArr = {
				key: ['string', {}]
			};
			var arrSch = {
				key: [new verja.Field({type: 'string'})]
			};
			verja.validate(objArr,arrSch, function(e) {
				assert.equal(JSON.stringify(e), JSON.stringify({key: {0: {}, 1: {type:true}}}));
				done();
			});

		});

		//need to fix the lib so this works
		it('should validate a primative', function(done) {
			verja.validate('some string', new verja.Field({type: 'string'}), function(e) {
				if (e) { throw e; }
				done();
			});
		});

		//need to fix the lib so this works
		it('should validate simple nested objects and return null for errors in the callback', function(done) {
			verja.validate(goodNest, nestSchema, function(e) {
				if (e !== null) { throw e; }
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

	});

});