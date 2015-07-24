/**
 * Created by jas on 2015-07-23.
 */
angular.module('whatsyourgetApp', [])
    .controller("currencyRatesController", function ($scope, $http) {
        $scope.appState = 'init';
        $scope.calculation = {};
        $scope.loadCountriesData = function () {
            var loadCountriesIsoCodes = function () {
                    $http.get("data/coutriesIsoCodes.json").success(function (data) {
                        $scope.countriesIsoCodes = data;
                        loadActiveCountriesTaxData();
                    });
                },
                loadActiveCountriesTaxData = function () {
                    $http.get("data/activeCountriesTaxData.json").success(function (data) {
                        $scope.activeCountriesTaxData = data;
                        _.each($scope.activeCountriesTaxData, function (item) {
                            var iso = _.findWhere($scope.countriesIsoCodes, {"ISO3166-1-Alpha-3": item.code});
                            item.name = iso.name;
                            item.currencyCode = iso.currency_alphabetic_code;
                        })
                    });
                };
            loadCountriesIsoCodes();
        };
        $scope.loadCountriesData();
        $scope.calculateServer = function () {
            $scope.provider = "localhost:8080";
            $scope.calculate();
        };
        $scope.calculateFixer = function () {
            $scope.provider = "api.fixer.io";
            $scope.calculate();
        };
        $scope.calculate = function () {
            console.log($scope.provider);
            var calcSalaryDetails = function (salaryGross, tax, fixedCost, rate) {
                var salaryGrossExchange = salaryGross * 22 * rate,
                    fixedCostExchange = fixedCost * rate,
                    tax = (salaryGrossExchange - fixedCostExchange) * tax * 0.01,
                    salaryNet = salaryGrossExchange - tax - fixedCostExchange;
                if (salaryNet < 0) {
                    salaryNet = 0;
                }
                if (tax < 0) {
                    tax = 0;
                }
                return {
                    salaryNet: s.numberFormat(salaryNet, 2),
                    tax: s.numberFormat(tax, 2),
                    fixedCost: s.numberFormat(fixedCostExchange, 2)
                };
            };

            if ($scope.userCurrencyChoice.currencyCode == "PLN") {
                $scope.calculation = calcSalaryDetails($scope.userSalary, $scope.userCurrencyChoice.tax, $scope.userCurrencyChoice.fixedCost, 1);
                $scope.appState = 'calculationReady';
            } else {
                $http.get('http://' + $scope.provider +'/latest?base=' + $scope.userCurrencyChoice.currencyCode).
                    success(function (data) {
                        $scope.currencyRatesData = data;
                        $scope.calculation = calcSalaryDetails($scope.userSalary, $scope.userCurrencyChoice.tax, $scope.userCurrencyChoice.fixedCost, $scope.currencyRatesData.rates["PLN"]);
                        $scope.appState = 'calculationReady';
                    });
            }
        };
    })
    .directive("salarycalculator", function () {
        return {
            restrict: "A",
            templateUrl: "templates/currencyRatesTemplate.html"
        };
    });