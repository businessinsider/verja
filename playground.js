'use strict';

var verja = require('./verja');

var obj = {
	name: 'some too long name',
	email: 'forrest.alamsi@gmail.com'
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
		str: new verja.Field({type: 'string'}),
		obj: new verja.Field({type: 'object'})
	},
	key2: new verja.Field({required: true, type: 'boolean'})
};

verja.validate('some string', new verja.Field({type: 'string'}), function(e) {
	console.log(e);
});