'use strict';

var verja = require('../verja');

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

	describe('required', function() {

		var schema = {
			property: new verja.Field({required: true})
		};

		it ('should check if the property is there', function(done) {
			var obj = {
				property: 'here i am!'
			};

			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should not pass on an empty string', function(done) {
			var obj = {
				key: ''
			};
			var schema = {
				key: new verja.Field({required: true})
			};

			verja.validate(obj, schema, function(err) {
				if (err) return done(); 
				throw err;
			});

		});

		it ('should pass on a longer string', function(done) {
			var obj = {
				key: 'hi'
			};
			var schema = {
				key: new verja.Field({required: true})
			};
			
			verja.validate(obj, schema, function(err) {
				if (!err) return done(); 
				throw err;
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

	describe('max', function() {
		var schema = {
			key: new verja.Field({max: 5})
		};

		it ('should throw an error if it\'s over the max', function(done) {
			var obj = {key: 6};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});

		});


		it ('should not throw an error if it\'s under the max', function(done) {
			var obj = {key: 4};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should fail if not number', function(done) {
			var obj = {
				key: {}
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

	});

	describe('min', function() {
		var schema = {
			key: new verja.Field({min: 5})
		};

		it ('should throw an error if it\'s under the min', function(done) {
			var obj = {key: 4};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});

		});


		it ('should not throw an error if it\'s over the min', function(done) {
			var obj = {key: 6};
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
			var obj = {
				key: {}
			};
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

	describe('int', function() {
		var schema = {
			key: new verja.Field({int: true})
		};

		it ('should confirm that a number is an integer', function(done) {
			var obj = {
				key: 5
			};

			verja.validate(obj, schema, function(err) {
				if (err) throw err;
				done();
			});
		});

		it ('should fail for a float', function(done) {
			var obj = {
				key: 5.555
			};

			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

		it ('should fail for a string number', function(done) {
			var obj = {
				key: '5'
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

		it ('should fail for a non-number', function(done) {
			var obj = {
				key: []
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

	});

	describe('equals', function() {

		it ('should pass when a string is equal', function(done) {
			var schema = {
				key: new verja.Field({equals: 'this string'})
			};
			var obj = {
				key: 'this string'
			};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should pass when a number is equal', function(done) {
			var schema = {
				key: new verja.Field({equals: 5})
			};
			var obj = {
				key: 5
			};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should pass for a boolean', function(done) {
			var schema = {
				key: new verja.Field({equals: false})
			};
			var obj = {
				key: false
			};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should pass for a pointer to the same object', function(done) {
			var point = new Object();
			var schema = {
				key: new verja.Field({equals: point})
			};
			var obj = {
				key: point
			};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should fail for a string number and a number', function(done) {
			var schema = {
				key: new verja.Field({equals: 5})
			};
			var obj = {
				key: '5'
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});

		});

		it ('should fail in other cases', function(done) {
			var schema = {
				key: new verja.Field({equals: []}),
				key2: new verja.Field({equals: {}}),
				key3: new verja.Field({equals: NaN})
			};
			var obj = {
				key: [],
				key2: {},
				key3: NaN
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

	});

	describe ('regex', function() {
		it ('should find an index in a string based on a string input', function(done) {
			var schema = {
				key: new verja.Field({regex: 'val'})
			};

			var obj = {
				key: 'value'
			};

			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});

		});

		it ('should not pass if the regex config is not present', function(done) {
			var schema = {
				key: new verja.Field({regex: 'value'})
			};

			var obj = {
				key: 'val'
			};

			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});

		});

		it ('should accept a regular expression as an argument', function(done) {
			var schema = {
				key: new verja.Field({regex: /val/i})
			};

			var obj = {
				key: 'Val'
			};

			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});
	});

	describe ('email', function() {
		it ('should tell if a given string is an email', function(done) {
			var schema = {
				key: new verja.Field({email: true}),
				key2: new verja.Field({email: true})
			};
			var obj = {
				key: 'falmasi@businessinsider.com',
				key2: 'forrest.almasi@something.co.uk'
			};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});

		it ('should tell if a given string is not an email', function(done) {
			var schema = {
				key: new verja.Field({email: true}),
				key2: new verja.Field({email: true}),
				key3: new verja.Field({email: true}),
				key4: new verja.Field({email: true})
			};
			var obj = {
				key: 'falmasi@b@businessinsider.com',
				key2: './/@businessinsiderm//',
				key3: 'falmasi@string',
				key4: 'falmasi@c.'
			};
			verja.validate(obj, schema, function(err) {
				if (JSON.stringify(err) === '{"key":{"email":true},"key2":{"email":true},"key3":{"email":true},"key4":{"email":true}}') return done();
				throw err;
			});
		});

		it ('should report an error if an input given is not a string', function(done) {
			var schema = {
				key: new verja.Field({email: true})
			};
			var obj = {
				key: []
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

	});

	describe ('url', function() {
		it ('should tell if a given string is a url', function(done) {
			var schema = {
				key: new verja.Field({url: true}),
				key2: new verja.Field({url: true}),
				key3: new verja.Field({url: true})
			};
			var obj = {
				key: 'http://gardenparty.club',
				key2: 'http://www.businessinsider.com',
				key3: 'https://github.com/malls/'
			};
			verja.validate(obj, schema, function(err) {
				if (!err) return done();
				throw err;
			});
		});
		it ('should tell if a given string is not a url', function(done) {
			var schema = {
				key: new verja.Field({url: true}),
				key2: new verja.Field({url: true}),
				key3: new verja.Field({url: true})
			};
			var obj = {
				key: 'http://gardenparty',
				key2: '8.8.8.8',
				key3: 'gardenparty.biz'
			};
			verja.validate(obj, schema, function(err) {
				if (JSON.stringify(err) === '{"key":{"url":true},"key2":{"url":true},"key3":{"url":true}}') return done();
				throw err;
			});
		});

		it ('should report an error if an input given is not a string', function(done) {
			var schema = {
				key: new verja.Field({url: true})
			};
			var obj = {
				key: []
			};
			verja.validate(obj, schema, function(err) {
				if (err) return done();
				throw err;
			});
		});

	});

});