'use strict';

var BI = new Object();

var commentSchema = {
	date: {type: Date, required: true},
	message: {type: BI.types.string, required: true, maxlength: 2000, minlength: 2},
	user: {type: String, email: true} // custom types in library?
};

var postSchema = {
	title: {type: String, async: '/whatever/titlechecker/:id', required: true},
	coments: {type: Array, schema: stringSchema, email: email},
	topComment: commentSchema
};

function email (x) {
	regex x 
	return boolean
}

var stringSchema = {
	type: String
	minlength: 6,
	maxlength: 6
}

BI.validators.thisDateRange = function(date) {
	if (date < 55555555) return true;
};

function validationMethod(val, callback){
	//do whatever
	setTimeout(function() {
		callback(true);
	},10000);
}

var postSchema = {
	title: {type: String, async: validationMethod, required: true},
	coments: {type: Array, schema: commentSchema},
	bla: {schema: slideshowSchema}
	topComment: commentSchema
}; 

var otherSchema = {
	someProp: { type: function(val) { return true; } }
};


BI.types.email = function(val) {
	//some horrible regex
	return val ? true : false;
};

var goodPost = {
	title: 'some kinda string',
	comments: [{
		date: Date.now(),
		user: 'validemail@email.com',
		message: 'a cool message'
	}, {
		date: '1413486500150',
		message: 'this message was made'
	}],
};

var badPost = {
	title: '',
	content: {something: 'messed up'},
	comments: [{date: Date.now, user: 'some@email.com', message: 'Obola does it again! Close the borders!@!'}, {user: '', message: '', date: Date.now()}]
};

BI.validate = function(a,b,c) {
	var errorset = a - b;
	return c(errorset);
};

var goodPostErrors, badPostErrors;

BI.validate(goodPost, postSchema, function(err){
	goodPostErrors = err;
	//goodPostErrors = {};
});

BI.validate(badPost, postSchema, function(err){
	badPostErrors = err;
	badPostErrors = {
		title: 'Title is required',
		content: {required: true},
		comments: 'Comment 2 has error: message is required'
		comments: [null, {message: 'required', date: 'not a date'}]
		comments: [
			null,
			{
				message: {
					maxlength: true,
					minlength: true,
					required: true
				}
				user: {
					email: true
				}
			}
		]
	};
});


<div ng-show="postErrors[$index].message.maxlength">Max length yo</div>
//errors will be given one at a time in order of importance. eg, required, not the right type, string length > maxlength, etc

