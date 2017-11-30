/**
 * @author ibolyauveges
 * @since 0.0.1
 * 
 * @description
 * This modul can manipulate on the Card Object
 * with MongoDB database
 * It uses mongoose modul to connect the MongoDB 
 * The connection in in the database/database.js
 * Configuration can be found in config/default.js.
 * 
 * @see card.api,js
 * @see card.model.js
 */
//This is an IIFE (Intermediatelly Invoked Function Expresson) function 
 (function(){

   const log  = require("../../logger/logger.js");
   const SanitizedCard = require("./card.model");
   const mongoose = require("../../database/database");

   //this is a model for the cards Collection
    //second parameter is a schema for the type of the collection's fields
    const database = mongoose.model('cards', new mongoose.Schema({id:Number, categoryId:Number, lessonId:Number, 
                     typeOfCard:String, question:String, answer:String, answerA:String, answerB:String, answerC:String,
                     creationDate: { type: Date, default: Date.now }}));
   var operations = {};

   operations.addCard = function(card, onSuccess, onError) {
       log.debug('Saving new card...');
       if( ! (card instanceof SanitizedCard)){
           var errMsg = "Structure of the Card not suitable for insertion";
           log.debug(errMsg);
           onError(errMsg);
       }
       if (!card.id) { card.id = Date.now(); }
       database.create(card, function(error, newCard){
           if(error) {
               log.debug(error);
               onError(error);
               return;
           }
           else {
               log.debug('New card has been successfully saved with id %d.', newCard.id);
               onSuccess(newCard);
           }
       });
   }

   operations.modCard = function(card, onSuccess, onError) {
        log.debug('Modify card with id:%d question:%s typeOfCard:%s...',card.id,card.question,card.typeOfCard);
        if( ! (card instanceof SanitizedCard)){
            onError("Structure of the Card not suitable for insertion")
        }
        database.findOneAndUpdate({ id: card.id}, 
            {   question: card.question,
                typeOfCard: card.typeOfCard,
                answer: card.answer,
                answerA: card.answerA,
                answerB: card.answerB,
                answerC: card.answerC,
            },
            {upsert:true},
            function(error,doc){
                if(error){
                    onError(error);
                }else{
                    onSuccess(doc);
                }
            } 
            );
     }

     operations.delCard = function(id, onSuccess, onError) {
        log.debug('Remove card with id:%d...', id);
        if( ! id ){
            onError("Wrong ID for deletion")
        }
        database.remove({ id: id}, 
            function(error,doc){
                if(error){
                    onError(error);
                }else{
                    onSuccess(doc);
                }
            } 
        );
     }

     operations.findOneCard = function(id, onSuccess, onError) {
        log.debug('Retrieve one card with id %d ...',id);
        if( ! id ){
            onError("Wrong id for retrieve one card");
        }
        
        database.findOne({ id: id}, 
            function(error,card){
                if(error){
                    onError(error);
                }else{
                    onSuccess(card);
                }
            } 
        );
     }

     operations.findAllCards = function(categoryId, lessonId, onSuccess, onError) {
        log.debug('Retrieve all card ...');
        if( ! categoryId ){
            onError("Wrong categoryId for retrieve all cards");
        }
        if( ! lessonId ){
            onError("Wrong lessonId for retrieve all cards");
        }
        database.find({ categoryId: categoryId, lessonId: lessonId}, 
            function(error,cards){
                if(error){
                    onError(error);
                }else{
                    onSuccess(cards);
                }
            } 
        );
     }

     operations.findCardsByTitle = function(categoryId, lessonId, searchString, onSuccess, onError) {
        log.debug('Retrieve cards where %s in the question ...', searchString);
        if( ! categoryId ){
            onError("Wrong categoryId for retrieve all cards");
        }
        if( ! lessonId ){
            onError("Wrong lessonId for retrieve all cards");
        }
        if (!searchString) {
            return operations.findAllCards(categoryId, lessonId, onError, onSuccess)
        }
        database.find({ categoryId: categoryId, lessonId: lessonId, question: new RegExp(searchString, 'g')}, 
            function(error,cards){
                if(error){
                    onError(error);
                }else{
                    onSucces(cards);
                }
            } 
        );
     }

   module.exports = operations;
 }());

