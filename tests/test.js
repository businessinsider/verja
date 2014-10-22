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
				key2: 'value'
			}
		};

		var badNest = {
			key: {
				key2: []
			}
		};

		var nestSchema = {
			key: {
				key2: new validator.Field({type: 'string'})
			}
		};

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
			
			assert.equal(errObj.key2.type, true);
		});
	});

});