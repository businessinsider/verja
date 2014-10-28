'use strict';

var verja = require('./verja');

var obj = {
	name: 'some too long name',
	email: 'forrest.almasi@gmail.com'
};

var schema2 = {
	car: {
		type: {
			make: new verja.Field({
				type: 'string',
				minlength: 90
			})
		}
	},
	key: new verja.Field({
		type: 'object'
	})
};

var my240 = {
	car: {
		type: {
			make: 'Volvo'
		}
	},
	key: 'string'
};

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
		str: new verja.Field(),
		obj: new verja.Field()
	},
	key2: new verja.Field(),
	key3: []
};

verja.addValidator('async', function(val, options, callback) {
	setTimeout(function() {
		if (!val) return callback(true);
		callback(false);
	}, 1000);
});
