  app.controller('postController', function($scope, $http) {
	  $scope.messageDefault;
	 $scope.messages=[];
	 $scope.messageRecieved={};
	 var theObject ={};
	  
			$http({
				url : 'chat/clientVerify',
				method : "GET"
				
			}).then(function(response) {
				$scope.messageDefault=response.data;
				
			/*}, function(response) {
				//fail case
				
				$scope.message = response;*/
			});

		  
		  
		  
	  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
		
		$scope.sendPost = function() {
			var theObject = { input:$scope.messageBody ,client_id:$('input#client_id').val(),conversation_id:$('input#conversationID').val() };
			$http({
				url : 'hello',
				method : "POST",
				data : {
					clientMSG : JSON.stringify(theObject),
				}
			}).then(function(response) {
				$scope.messageRecieved.key = response.data;
				$scope.messageRecieved.value=$scope.messageBody;
				$scope.messageBody="";
				$scope.messages.push($scope.messageRecieved);
				$scope.messageRecieved={};
				
				
			}, function(response) {
				//fail case
				
				$scope.message = response;
			});

		  };
       
    });