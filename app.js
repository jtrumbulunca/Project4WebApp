(function() {
	var app = angular.module('contacts', []);

	app.controller('ContactController', ['$scope', function($scope) {
		$scope.firstName = $scope.lastName = $scope.address = $scope.phoneNumber = '';
		$scope.contacts = [];
		
		$scope.all = function() {
			$.getJSON('getContact', function(result) {
				$scope.contacts = result;
			});
		};

		$scope.add = function() {
			var newContact = {
				"firstName" : $scope.firstName,
				"lastName" : $scope.lastName,
				"address" : $scope.address,
				"phoneNumber" : $scope.phoneNumber
			};
			$scope.contacts.push(newContact);
			$.post('putContact', newContact);
		  $scope.firstName = $scope.lastName = $scope.address = $scope.phoneNumber = '';
		};
		
		$scope.update = function() {
			var updateContact = { "firstName" : $scope.firstName, "phoneNumber" : $scope.phoneNumber};
			$.post('updateContact', updateContact);
			$scope.firstName = $scope.lastName = $scope.address = $scope.phoneNumber = '';
		};
		
		$scope.remove = function(contact) {
			$scope.contacts.splice($scope.contacts.indexOf(contact), 1);
			$.post('removeContact', contact);
		};									 
	}]);
}());