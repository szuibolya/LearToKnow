(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('searchController', searchController);

    function searchController($scope,$rootScope,$state) {
        $scope.newClick = function(){
            $rootScope.isAdd = true;  
            $rootScope.functionTitle = "New" +  getTitle();
            $rootScope.function = "new";
        }

        $scope.doSearch = function(){
            var stateLocation =  $state.current.name;
            $state.go(stateLocation, {searchString: $scope.searchString});
        }

        function getTitle(){
            var hash = location.hash;
            switch(hash){
                case '#!/': return 'Category';
                case '#!/lesson': return 'Lesson';
                case '#!/card': return 'Card';
                default: return "";
            }
        }
  
    }

})();