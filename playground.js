'use strict';

var validator = require('./bi-validator');

validator.addValidator('email', function(val) {
	if (!val) return true;
	return false;
});

var obj = {
	name: 'some too long name',
	email: 'forrest.alamsi@gmail.com'
};

var scheme = {
	name: new validator.Field({
		type: String,
		maxlength: 5
	}),
	email: new validator.Field({
		type: String,
		minlength: 4,
		email: true
	}),
	date: new validator.Field({
		required: true,
		type: Date
	})
};

var schema2 = {
	car: {
		type: {
			make: new validator.Field({
				type: String,
				minlength: 3
			})
		}
	}
};

var my240 = {
	car: {
		type: {
			make: 'Volvo'
		}
	}
};


validator.validate(obj, scheme, function(err) {
	console.log(err);
});

validator.validate(my240, schema2, function(err) {
	console.log(err);
});