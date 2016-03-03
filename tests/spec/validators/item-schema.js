'use strict';

if (typeof require !== 'undefined') {
	var verja = require('../../../verja.js');
}

describe('itemSchema validation rule', function() {

	var obj = {
		key: []
	};

	var schema = {
		key: new verja.Field({
			minlength: 2,
			itemSchema: new verja.Field({
				type: 'string'
			})
		})
	};

	var complexSchema = {
		key: new verja.Field({
			type: 'array',
			itemSchema: new verja.Field({
				type: 'array',
				itemSchema: new verja.Field({
					type: 'string'
				})
			})
		})
	};

	var pollSchema = {
		questions: new verja.Field({
			type: 'array',
			minlength: 1,
			itemSchema: {
				text: new verja.Field({
					required: true,
					type: 'string'
				}),
				answers: new verja.Field({
					type: 'array',
					minlength: 2
				})
			}
		})
	};

	it('should throw an error if there\'s a problem with the array', function(done) {
		verja.validate(obj, schema, function(e) {
			if (e) return done();
			throw e;
		});
	});

	it('should not throw an error if there are no problems with the array members', function(done) {
		obj.key.push('string', 'another string');
		verja.validate(obj, schema, function(e) {
			if (!e) return done();
		});
	});

	it('should throw an error if there\'s a problem with an array member', function(done) {
		obj.key.push([]);
		verja.validate(obj, schema, function(e) {
			if (e) return done();
			throw e;
		});
	});

	it('should validate an array within an array', function(done) {
		var complexObj = {
			key: [
				['string'],
				['another']
			]
		};
		verja.validate(complexObj, complexSchema, function(e) {
			if (!e) return done();
			throw e;
		});
	});

	it('should properly report errors in a complexly structered schema where the type is correct until the lowest level', function(done) {
		var complexObj = {
			key: [
				['string'],
				[{}],
				[{}]
			]
		};

		verja.validate(complexObj, complexSchema, function(e) {
			if (JSON.stringify(e) === '{"key":{"0":{"0":{}},"1":{"0":{"type":true}},"2":{"0":{"type":true}}}}') return done();
			throw e;
		});

	});

	it('should properly report errors in a complexly structered schema where the type is incorrect in different levels', function(done) {
		var complexObj = {
			key: [
				['string'],
				[{}], {}
			],
			key2: []
		};

		verja.validate(complexObj, complexSchema, function(e) {
			if (JSON.stringify(e) === '{"key":{"0":{"0":{}},"1":{"0":{"type":true}},"2":{"type":true}}}') return done();
			throw e;
		});

	});

	it('should handle a correct obect as complex as our poll object', function(done) {
		var poll = {
			questions: [
				{text: 'hi there', answers: ['one answer', 'two answers']}
			]
		};

		verja.validate(poll, pollSchema, function(e) {
			if (!e) return done();
			throw e;
		});
	});

	it('should find the errors in an object as complex as our poll object', function(done) {
		var poll = {
			questions: [{text: 'xxx', answers: ''}]
		};

		verja.validate(poll, pollSchema, function(e) {
			if (JSON.stringify(e) === '{"questions":{"0":{"text":{},"answers":{"type":true,"minlength":true}}}}') {
				return done();
			}
			throw e;
		});
	});

	it('should handle a flat array', function(done){
		verja.validate({arrayItem: ['astring']}, {
			arrayItem: new verja.Field({
				type: 'array',
				itemSchema: new verja.Field({
					type: 'string'
				})
			})
		}, function(e) {
			if (!e) { return done(); }
			throw e;
		})
	});

});