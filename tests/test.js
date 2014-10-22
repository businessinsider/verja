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
			}
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
			}
		};

		//need to fix the lib so this works
		it('should validate a primative', function(done) {
			validator.validate('some string', new validator.Field({type: 'string'}), function(e){
				if (e) { throw e; }
				done();
			});
		});

		//need to fix the lib so this works
		it('should validate simple nested objects and return null for errors in the callback', function(done) {
			validator.validate(goodNest, nestSchema, function(e) {
				if (e !== null) { throw e; }
				done();
			});
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
	
	//need to fix the lib to return null for no errors so this works
	describe('validation rule: type', function(){
		var schema = {
			property: new validator.Field({type: 'string'})
		};
		var obj = {
			property: 'some value'
		};
		it ('should not throw an error when a string is passed in', function(done){
			validator.validate(obj, schema, function(err) {
				if (err) { throw err; }
				done();
			});
		})
		it ('should throw an error when a string is not passed in', function(done){
			obj.property = [];
			validator.validate(obj, schema, function(err) {
				if (err) { return done(); }
				throw err;
			});
		})
	})

});