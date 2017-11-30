/**
 * @author ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This implements the RestAPi on the server side
 * for de card entity
 */
(function(){
 const logger = require('../../logger/logger');
 const apiRoot = '/card';
 const express = require('express');
 let SanitizedCard = require('./card.model');
 let store = require('./card.store');

 let apiRouter = express.Router();


 function getAllCards(request, response){
    let categoryid = request.params.categoryid;
    let lessonid = request.params.lessonid;
    let searchTerm = request.query.searchString;

    if( !categoryid || !lessonid) {
       response.status(400).send('Wrong categoryid or lessonid');
       return;
    }
    if(searchTerm){
        store.findCardsByTitle(categoryid, lessonid, searchTerm,
        function(cards){
           response.status(200).json(cards);
        },
        function(error){
           response.status(500).send(error);
        });

    }else{
        store.findAllCards(categoryid, lessonid,
        function(cards){
            response.status(200).json(cards);
        },
        function(error){
            response.status(500).send(error);
        });
    }
 }
 function getOneCard(request, response){
     let id = request.params.id;
     if ( !id) {
         response.status(400).send('Wrong ID');
         return;
     }
     store.findOneCard(id,
      function(card){
          resonse.status(200).json(card);
      },
      function(error){
          response.status(500).send(error);
      }
    );
 }

 function postCard(request, response){
    let categoryId = request.params.categoryid; 
    let lessonId   = request.params.lessonid;
    let card = request.body;

    if ( !categoryId) {
        response.status(400).send('Wrong categoryid');
        return;
    }
    if ( !lessonId) {
        response.status(400).send('Wrong lessonid');
        return;
    }
    if ( !card) {
        response.status(400).send('Empty card');
        return;
    }
    card.categoryId = categoryId;
    card.lessonId = lessonId;
    store.addCard(new SanitizedCard(card._id, card.id, card.categoryId, card.lessonId, card.question, card.answer,card.typeOfCard,
                                    card.answerA, card.answerB, card.answerC, card.creationDate),
     function(newcard){
         response.status(200).json(newcard);
     },
     function(error){
         response.status(500).send(error);
     }
   );
 }

 function putCard(request, response){
    let card = request.body;
    let id   = request.params.id;
    if ( !card) {
        response.status(400).send('Empty card');
        return;
    }
    if ( !id) {
        response.status(400).send('Wrong ID');
        return;
    }
    card.id = id;
    store.modCard(new SanitizedCard(card._id, card.id, card.categoryId, card.lessonId, card.question, card.answer,card.typeOfCard,
        card.answerA, card.answerB, card.answerC, card.creationDate),
     function(card){
         response.status(200).json(card);
     },
     function(error){
         response.status(500).send(error);
     }
   );
 }

 function deleteCard(request, response){
    let id   = request.params.id;
    
    if ( !id) {
        response.status(400).send('Wrong ID');
        return;
    }
    store.delCard(id,
     function(doc){
         response.status(200).json(doc);
     },
     function(error){
         response.status(500).send(error);
     }
   );
 }
 apiRouter.get(apiRoot + '/:categoryid/:lessonid', getAllCards);
 apiRouter.get(apiRoot + '/:id', getOneCard);
 apiRouter.post(apiRoot + '/:categoryid/:lessonid', postCard);
 apiRouter.put(apiRoot + '/:id', putCard);
 apiRouter.delete(apiRoot + '/:id', deleteCard);

 module.exports = apiRouter;
}());
