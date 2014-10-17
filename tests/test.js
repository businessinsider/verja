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
		var errObj = {};

		validator.validate(obj, schema, function(err) {
			console.log('err',err);
			errObj = err;
		});


		it('addValidator adds a validator', function() {
			console.log('errObj',errObj);

			assert.equal(true, errObj.key);
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

	});

	describe('validate', function() {

	});

});