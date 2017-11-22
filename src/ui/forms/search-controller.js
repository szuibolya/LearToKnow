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

        $scope.search = function(formData){
            
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