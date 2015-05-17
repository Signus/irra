angular.module('irraApp', []);

function mainController($scope, $http) {
    $http.get('./json/irra.json').success(function (data) {
        $scope.domains = [];

        angular.forEach(data.domains, function (value, key) {
            $scope.domains.push(value);
        });
    });
}

function domainsController($scope) {
    console.log('Domains');
}

function topicsController($scope) {
    console.log('Topics');
}

function subtopicsController($scope) {
    console.log("Subtopics");
}

function questionsController($scope) {
    console.log('Questions');
}