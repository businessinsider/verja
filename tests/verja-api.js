'use strict';

var assert = require('assert');
var verja = require('../verja.js');

describe ('verja API', function() {

	describe ('addValidator', function() {

		it ('addValidator adds a validator', function() {
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

			assert.equal(true, errObj.key.haskey);
		});

		it ('makes this array thing work how i want', function() {
			verja.addValidator('isntArray', function(val, config) {
				if (Array.isArray(val)) return false;
				return true;
			});
			var schema = {
				key: new verja.Field({isntArray: true}),
				key2: new verja.Field({isntArray: true})
			};
			var obj = {
				key: 'not an array!',
				key2: ['clearly an array!']
			};

			verja.validate(obj, schema, function(err) {
				assert.equal(JSON.stringify(err), '{\"key\":{\"isntArray\":true},\"key2\":{}}');
			});

		});

	});

	describe ('Field', function() {

		var obj = {key: 'value'};
		var field = new verja.Field(obj);

		it ('the Field constructor should return an object with the same properties', function() {
			assert.equal(obj.key, field.key);
		});

		it ('the Field constructor should not return the same object', function() {
			assert.notEqual(obj, field);
		});

		it ('should be able to check if a field is an instance of Field', function() {
			assert.equal(field instanceof verja.Field, true);
		});

	});

	describe ('validate', function() {

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

		it ('should validate an array', function(done) {
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
		it ('should validate a primative', function(done) {
			verja.validate('some string', new verja.Field({type: 'string'}), function(e) {
				if (e) { throw e; }
				done();
			});
		});

		//need to fix the lib so this works
		it ('should validate simple nested objects and return null for errors in the callback', function(done) {
			verja.validate(goodNest, nestSchema, function(e) {
				if (e !== null) { throw e; }
				done();
			});
		});

		it ('should validate simple nested objects (invalid example)', function() {
			var errObj;
			verja.validate(badNest, nestSchema, function(e) {
				errObj = e;
			});

			assert.equal(errObj.key.str.type, true);
			assert.equal(errObj.key.obj.type, true);
		});

	});

});