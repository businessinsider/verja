'use strict';

var assert = require('assert');
var verja = require('../verja.js');

describe('validation rules', function() {
	
	//need to fix the lib to return null for no errors so this works
	describe('type', function() {
		var schema = {
			property: new verja.Field({type: 'string'})
		};

		var obj = {
			property: 'some value'
		};

		it ('should not throw an error when a string is passed in', function(done) {
			verja.validate(obj, schema, function(err) {
				if (err) { throw err; }
				done();
			});
		});

		it ('should throw an error when a string is not passed in', function(done) {
			obj.property = [];
			verja.validate(obj, schema, function(err) {
				if (err) { return done(); }
				throw err;
			});
		});
	});

});