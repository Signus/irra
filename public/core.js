angular.module('irraDomain', []);

function mainController($scope, $http) {

    $scope.totalScore = 0;
    $scope.estimated_score = 0;
    $scope.answer = true;
    $scope.responses = [
    	{ value:"Yes", score: 1 },
    	{ value:"No", score: 0 }
    ];

    $http.get('./json/irra.json').success(function (data) {
        $scope.domains = [];

        angular.forEach(data.domains, function (value, key) {
            $scope.domains.push(value);
        });
    });

    // When a new seleciton is made, update the question in scope
    // Trigger a recalculation of the subtopic score
    $scope.subtopicScoreUpdate = function(question, valueResponse, modifier) {
        var total_weighted = 0;
        var total_score = 0;
	    
	    (valueResponse == 1) ? question.valueResponse = 1 : question.valueResponse = 0;

        switch (modifier.toUpperCase()) {
            case 'HIGH':
                question.modifier = 3;
                break;
            case 'MEDIUM':
                question.modifier = 2;
                break;
            case 'LOW':
                question.modifier = 1;
                break;
        }

        total_weighted += question.modifier;
        total_score += question.valueResponse;

        // FIXME: All subtopic scores update
        // FIXME: Subtopic score reflects changes over time, resulting in wrong score
        $scope.estimated_score = (total_score / total_weighted).toFixed(2);
  	};

    // Initialize the score to 1.
    // TODO: Set the response visible to 'Yes'
	$scope.scoreInit = function() {
        angular.forEach($scope.domains, function(question) {
            question.valueResponse = 1;
        });
    }();
}