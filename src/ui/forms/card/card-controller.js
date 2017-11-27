
(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('cardController', cardController);

    function cardController($scope,$rootScope,$stateParams,cardApiService) {
        var cardCtrl = this;
        
        cardCtrl.initController = function(){
            $rootScope.isAdd = false;
            $rootScope.isEdit = false;
            $rootScope.iserror = false;
            cardCtrl.editCard = new Card();
            cardApiService.getOneLesson($stateParams.lessonid)
            .when((result => {
                cardCtrl.lesson  = result.data;
            }))
            .catch(error => {
                WriteErrorMsg(result.data,"Loading of lesson's data failed");
            });
            cardApiService.getAllCards($stateParams.lessonid)
            .when((result) => {
                cardCtrl.cards = result.data;
            })
            .catch((error) => {
                writeError(result.data,"Loading of all cards failed")
            });
        }
        cardCtrl.initController();

        cardCtrl.isMulti = function(typeOfCard){
           return (typeOfCard == "MULTI-CHOICE");
        }

        cardCtrl.replaceXXX = function(text){
             var t = text;
             var v = t.replace("XXX","__________");
             return v;
        }

        cardCtrl.submit= function(form) {
            form.$setDirty();
            if(!form.$valid) return;
            
            cardApiService.postCard(cardCtrl.editCard)
            .when((result)=>{
                catrdCtrl.initController();
                iserror = false;
            })
            .catch((result)=>{
                WriteErrorMsg(result.data,'Saving of Card failed');
            })
        }

        function WriteErrorMsg(errorMsg,errTitle){
            $rootScope.iserror = true;
            ("#error-msg").html(errTitle+": "+errorMsg);
        }

    }


})();