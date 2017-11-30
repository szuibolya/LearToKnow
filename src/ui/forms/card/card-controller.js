
(function () {
    'use strict';

    angular
        .module("learnApp")
        .controller('cardController', cardController);

    function cardController($scope,$rootScope,$stateParams,cardApiService,lessonApiService) {
        var cardCtrl = this;
        
        cardCtrl.initController = function(){
            $rootScope.isAdd = false;
            $rootScope.isEdit = false;
            $rootScope.iserror = false;
            cardCtrl.ismulti = false;
            cardCtrl.types = getTypesOfCard();
            cardCtrl.editCard = new Card($stateParams.categoryid,$stateParams.lessonid);

            var resultPromise = lessonApiService.getOneLesson($stateParams.categoryid,$stateParams.lessonid)
            resultPromise.then(function(result){
                cardCtrl.lesson  = result.data;
            })
            .catch(error => {
                WriteError(error.data,"Loading of lesson's data failed");
            });
            cardApiService.getAllCards($stateParams.categoryid,$stateParams.lessonid,$rootScope.searchString)
            .then((result) => {
                cardCtrl.cards = result.data;
            })
            .catch((error) => {
                writeError(error.data,"Loading of all cards failed")
            });
            
        }
        cardCtrl.initController();

        cardCtrl.isMulti = function(typeOfCard){
           return (typeOfCard == "MULTI-CHOICE");
        }

        cardCtrl.onEdit = function(card){
            $rootScope.isEdit=true;
            cardCtrl.editCard = card;
            cardCtrl.changeTypeOfCard();  
        }

        cardCtrl.onDelete = function(card){
            var promise = cardApiService.deleteCard(card.id);
            promise.then((result)=>{
                cardCtrl.initController();
                $rootScope.iserror = false;
            })
            .catch((result)=>{
                writeError(result.data,'Deleting of Card failed');
            })
        }

        cardCtrl.replaceXXX = function(text){
             var t = text;
             var v = t.replace("XXX","_____");
             return v;
        }

        cardCtrl.changeTypeOfCard = function(){
            cardCtrl.ismulti =cardCtrl.isMulti(cardCtrl.editCard.typeOfCard);    
        }

        cardCtrl.submit= function(form) {
            form.$setDirty();
            if(!form.$valid) return;
            var promise; 
            if($rootScope.isEdit){
                promise = cardApiService.putCard(cardCtrl.editCard);
            }else{
                promise = cardApiService.postCard($stateParams.categoryid,$stateParams.lessonid,cardCtrl.editCard);
            }
            promise.then((result)=>{
                cardCtrl.initController();
                $rootScope.iserror = false;
            })
            .catch((result)=>{
                writeError(result.data,'Saving of Card failed');
            })
        }
       
        function writeError(errMsg,title){
            var errmsgdiv = $('#error-msg');
            errmsgdiv.html(errMsg);
            console.log(title);
            console.log(errMsg);
            $rootScope.iserror = true;
        }

    }


})();