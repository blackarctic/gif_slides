var app = angular.module('gif_slides', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('slides', {
            url: '/slides/{id:int}',
            templateUrl: '/index.html',
            controller: 'MainCtrl'
        });
    
        $urlRouterProvider.otherwise('slides/1');
    }
]);

app.controller('MainCtrl', [
	'$scope',
	'$state',
	'$stateParams',
	function($scope, $state, $stateParams){
    	
    	var appData = new AppData();
    	
    	$scope.title = appData.title;
    	$scope.lines = appData.lines;
    	$scope.slide = $stateParams.id;
		
		//go forward a slide
		$scope.next = function() {
    		if ($scope.slide < $scope.lines.length) {
        		$scope.slide += 1;
        		$state.go('slides', {id: $scope.slide});
    		}
		};
		
		//go back a slide
		$scope.back = function() {
    		if ($scope.slide > 1) {
        		$scope.slide -= 1;
        		$state.go('slides', {id: $scope.slide});
    		}
		};
		
		//control with keys
		document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    $scope.back();
                    break;
                case 39:
                    $scope.next();
                    break;
            }
        };
}]);