'use strict';

var assert = require('assert');
var validator = require('../bi-validator');

describe('validator', function() {
	
	describe('addValidator', function() {

		validator.addValidator('haskey', function(val) {
			if (!val) return true;
			return false;
		});

		var schema = {
			key: new validator.Field({haskey: true})
		};
		var obj = {};
		var errObj;

		validator.validate(obj, schema, function(err) {
			errObj = err;
		});

		it('addValidator adds a validator', function() {
			assert.equal(true, errObj.key.haskey);
		});

	});

	describe('Field', function() {

		var obj = {key: 'value'};
		var field = new validator.Field(obj);

		it('the Field constructor should return an object with the same properties', function() {
			assert.equal(obj.key, field.key);
		});

		it('the Field constructor should not return the same object', function() {
			assert.notEqual(obj, field);
		});

		it('should be able to check if a field is an instance of Field', function() {
			assert.equal(field instanceof validator.Field, true);
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
				str: new validator.Field({type: 'string'}),
				obj: new validator.Field({type: 'object'})
			},
			key2: new validator.Field({required: true, type: 'boolean'})
		};

		it('should validate an array', function() {
			var errObj;
			var objArr = {
				key: ['string', {}]
			};
			var arrSch = {
				key: [new validator.Field({type: 'string'})]
			};
			validator.validate(objArr,arrSch, function(e) {
				errObj = e;
			});

			assert.equal(errObj, {key: {'1': {type:true}}});
		});

		it('should validate simple nested objects (valid example)', function() {
			var errObj;
			validator.validate(goodNest, nestSchema, function(e) {
				errObj = e;
			});

			assert.equal(Object.keys(errObj).length, 0);
		});

		it('should validate simple nested objects (invalid example)', function() {
			var errObj;
			validator.validate(badNest, nestSchema, function(e) {
				errObj = e;
			});

			assert.equal(errObj.key.str.type, true);
			assert.equal(errObj.key.obj.type, true);
		});

	});

});