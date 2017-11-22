
(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('cardController', cardController);

    function cardController($scope,$rootScope) {
        var vm = this;
        $rootScope.isAdd = false;
        vm.initController = function(){
             $scope.cards = getDummyCardsList();
        }
        vm.initController();

        vm.isMulti = function(typeOfCard){
           return (typeOfCard == "MULTI-CHOICE");
        }

        vm.replaceXXX = function(text){
             var t = text;
             var v = t.replace("XXX","__________");
             return v;
        }
    }


})();