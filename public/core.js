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
	    
	    if (valueResponse == 1)
	    	question.valueResponse = 1;
        else
			question.valueResponse = 0;

	    if (modifier.toUpperCase() == "HIGH")
	    	question.modifier = 3;
	    else if (modifier.toUpperCase() == "MEDIUM")
            question.modifier = 2;
	    else if (modifier.toUpperCase() == "LOW")
	    	question.modifier == 1;

	    $scope.subtopicCalculate(question);
  	};

    // Recalulate the subtopic score on every dropdown change.
    // TODO: Don't calculate pass/fail items.
  	$scope.subtopicCalculate = function (question) {

        var total_weighted = 0;
        var total_score = 0;

        angular.forEach(question, function (q, v) {
            console.log('v: ' + v);
            q.score = q.valueResponse
            console.log(q.score);
            total_weighted += q.modifier;
            console.log(total_weighted);
            total_score += q.score;
            console.log(total_score);
        });

        $scope.estimated_score = total_score / total_weighted;
        //console.log($scope.estimated_score);
        //console.log(total_score);
        //console.log($scope.totalScore);
        //console.log(total_weighted);
    };

    // Initialize the score to 1.
	$scope.scoreInit = function() {
        angular.forEach($scope.domains, function(question) {
            question.valueResponse = 1;
        });

        $scope.subtopicCalculate();
    }();
}