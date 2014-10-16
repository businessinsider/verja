var app = angular.module('app', []);





app.controller('formController', function($scope, Validator) {
		$scope.items = ["hello world","something","something else"];

		$scope.post = {
			name: 'some kinda string',
			email: 'validemail@email.com',
			comments: [
				{date: Date.now(), message: 'a cool message'}, 
				{date: 1413486500150, message: 'this message was made'}
			],
			title: 'this-title-doesn\'t exist'
		};


		$scope.validPost = Validator.validate($scope.post);


	});

app.service('Validator', function(){

	function validate(obj) {
		obj.validated = true;
		return obj;
	}

	return {
		validate: validate
	}

});
