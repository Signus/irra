angular.module('irraDomain', []);

function mainController($scope, $http) {

    $scope.totalScore = 0;
    $scope.estimated_score = 0;
    $scope.answer = true;
    $scope.responses = [
    	{value:"yes", score:1},
    	{value:"no", score: 0}
    ];

    $http.get('./json/irra.json').success(function (data) {
        $scope.domains = [];

        angular.forEach(data.domains, function (value, key) {
            $scope.domains.push(value);
        });
    });

    $scope.subtopicScoreUpdate = function(question, valueResponse, modifier) {
	    // When a new selection is made, update question object on scope
	    // and trigger recalculation of overall subtopic score 
	    if (valueResponse == 1)
	    	question.valueResponse = 1;
        else
			question.valueResponse = 0;

	    if (modifier.toUpperCase() == "HIGH") {
	    	question.modifier = 3;
	    } else if (modifier.toUpperCase() == "MEDIUM") {
            question.modifier = 2;
	    } else if (modifier.toUpperCase() == "LOW") {
	    	question.modifier == 1;
	    }

	    $scope.subtopicCalculate(question);
  	};

  	$scope.subtopicCalculate = function (question) {
        // Recalculate subtopic on every dropdown change.
        var total_weighted = 0;
        var total_score = 0;

        angular.forEach(question, function (q, v) {
          // Don't calculate for pass/no-pass courses!
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

	$scope.scoreInit = function() {
        angular.forEach($scope.domains, function(question) {
        question.valueResponse = 1;
        });

        $scope.subtopicCalculate();
    }();
}