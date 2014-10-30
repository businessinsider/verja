'use strict';

if (typeof require !== 'undefined') {
	var verja = require('../../verja.js');
}

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
				if (err) throw err;
				done();
			});
		});

		it ('should throw an error when a string is not passed in', function(done) {
			obj.property = [];
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});
	});

	//to do
	describe('required', function() {

		var schema = {
			property: new verja.Field({required: true})
		};

		it ('should check if the property is there', function(done) {
			var obj = {
				property: 'here i am!'
			};

			verja.validate(obj, schema, function(err) {
				if (err) throw err;
				done();
			});
		});

		it ('should show up in the error object if the property isn\'t there', function(done) {
			var obj = {
				property: undefined
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

	});

	describe('maxlength', function() {

		var schema = {
			key: new verja.Field({maxlength: 5})
		};

		it ('should throw an error if it\'s over the max length', function(done) {
			var obj = {key: 'some long string'};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});

		});


		it ('should not throw an error if it\'s under the max length', function(done) {
			var obj = {key: 'good'};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should fail if not an array or string', function(done) {
			var obj = {key: {}}
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

	});

	describe('minlength', function() {

		var schema = {
			key: new verja.Field({minlength: 5})
		};

		it ('should throw an error if it\'s under the min length', function(done) {
			var obj = {key: 'xxx'};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});

		});


		it ('should not throw an error if it\'s over the min length', function(done) {
			var obj = {key: 'some long string'};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});

		});

		it ('should fail if not an array or string', function(done) {
			var obj = {key: true};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});

		});

	});

});