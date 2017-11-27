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
 let sanitizedCard = require('./card.model');
 let store = require('./card.store');

 let apiRooter = express.Rooter();

 function getAllCards(request, response){
    let categoryId = request.params.categoryid;
    let categoryId = request.params.lessonid;
    let searchTerm = request.query.searchString;

    if( !categoryid || !lessonid) {
       response.status(400).send('Wrong categoryid or lessonid');
       return;
    }
    if(searchTerm){
        store.findByTitle(categoryid,lessonid,searchTerm,
        function(cards){
           response.status(200).json(cards);
        },
        function(error){
           response.status(500).send(error);
        });

    }else{
        store.findAll(categoryid, lessonid,
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
     store.findOne(id,
      function(card){
          resonse.status(200).json(card);
      },
      function(error){
          response.status(500).send(error);
      }
    );
 }
 function postCard(request, response){
    
 }
 function putCard(request, response){
    
 }
 function deleteCard(request, response){
    
 }
 apiRooter.get(apiRoot + '/:categoryid/:lessonid', getAllCards);
 apiRooter.get(apiRoot + '/:id', getOneCard);
 apiRooter.post(apiRoot, postCard);
 apiRooter.put(apiRoot + '/:id', putCard);
 apiRooter.delete(apiRoot + '/:id', deleteCard);

}());
