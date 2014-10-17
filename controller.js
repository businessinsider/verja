var app = angular.module('app', []);

app
	.controller('formController', function($scope, Validator) {

		$scope.post = {
			name: 'some kinda string',
			email: 'validemail@email.com',
			comments: [{
				date: Date.now(),
				message: 'a cool message'
			}, {
				date: 1413486500150,
				message: 'this message was made'
			}],
			title: 'this-title-doesn\'t exist'
		};

		$scope.validPost = Validator.validatePost($scope.post);

		$scope.addComment = function() {
			$scope.post.comments.push({date: Date.now(), message: ''});
		};

		$scope.deleteComment = function(index) {
			$scope.post.comments.splice(index,1);
		}

	})
	.service('Validator', function() {

		var goodPost = {
			name: 'some kinda string',
			email: 'validemail@email.com',
			comments: [{
				date: Date.now(),
				message: 'a cool message'
			}, {
				date: '1413486500150',
				message: 'this message was made'
			}],
			title: 'this-title-doesn\'t exist'
		};

		var badPost = {
			name: false,
			comments: ['string comment', {name: 'worse comment'}],
			title: 'a unique title'
		};

		// var post = schema({
		// 	name: String,
		// 	email: String,
		// 	comments: Array.of(comment)
		// });

		// var comment = schema({
		// 	date: Number,
		// 	'*': String
		// });

		function validatePost(obj) {
			obj.validated = true;
			return obj;
		}

		return {
			validatePost: validatePost
		}

	});