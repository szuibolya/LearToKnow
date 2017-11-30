/**
 * @author  ibolya.uveges
 * @since   0.0.1
 *
 * @description
 * This module defines REST HTTP endpoints for
 * manipulating lesson in LearnToKnow Application
 *
 * @see     lesson.store.js
 * @see     lesson.model.js
 */
(function () {
    'use strict';

    const log = require('../../logger/logger');

    //this is an url
    const apiRoot = '/lesson';
    log.debug("apiRoot="+apiRoot);
    //express modul
    const express   = require('express');

    //this is without filename extension
    let Sanitizedlesson       = require('./lesson.model');
    const store  = require('./lesson.store');

    //the intantiate of the express modul
    let apiRouter = express.Router();

    //implement the communication on different method
   
    function getAllLessons(request, response) {
            //request.query contains parameters that is after ? 
            //request.params  contains parameters that is before ? (for example :id)

            let searchString = request.query.searchString;
            let categoryid = parseInt(request.params.categoryid, 10);
            log.debug("getAllLessons categoryid="+categoryid+" searchString="+searchString);
            if (searchString) {
                //store is an own nodejs module    
                store.findInTitle(categoryid,searchString,
                (lessons) => { 
                    response.status(200).json(lessons);
                }, 
                (error) => {
                    response.status(500).send(error);
                });
            } else {
                store.findAll(categoryid, 
                    function(lessons){
                        response.status(200).json(lessons);
                    },
                    function(error){ 
                        response.status(500).send(error);
                    });
            }
        }
     function getlessonById(request, response) {
            //request.params  contains parameters that is before ? (for example :id)
            let id = parseInt(request.params.id, 10);
            if (id === undefined || isNaN(id)) { 
                response.status(400).send('Wrong ID parameter!');
                return;
            }

            store.findById(id, (lessons) => {
                response.status(200).json(lessons);
            }, (error) => {
                response.status(500).send(error);
            });
    }

    function createlesson(request, response){
        log.debug("createlesson "+request);
            //request.body: this is the data in POST or PUT methods of http
            let lesson = request.body;
            let categoryid = parseInt(request.params.categoryid, 10);
            lesson.categoryId = categoryid;
            log.debug(lesson);
            if (!lesson || lesson.name === undefined || lesson.name === "") {
                response.status(400).send('Invalid lesson to save!');
                return;
            }

            store.addlesson(new Sanitizedlesson(lesson._id,lesson.id, categoryid, lesson.name, lesson.description, lesson.style, lesson.checked),
             (newlesson) => {
                response.status(200).json(newlesson); 
            }, (error) => {
                response.status(500).send(error);
            });
    }

    function modifylesson(request, response){
            let lesson = request.body;
            let id = parseInt(request.params.id, 10);
            if (!lesson) {
                response.status(400).send('Invalid lesson to modify!');
                return;
            }

            store.modlesson(new Sanitizedlesson(lesson._id,lesson.id, lesson.categoryId, lesson.name, lesson.description, lesson.style, lesson.checked,lesson.lessons,lesson.creationDate), 
            (error,docs) => {
                if(error){
                    response.status(500).send(error);
                }else{
                    response.status(201).json(docs);
                }
            });
    }
    function deletelesson(request, response){
            let id = parseInt(request.params.id, 10);
            if (!id) {
                response.status(400).send('Wrong ID parameter!');
                return;
            }

            store.dellesson(id, (error) => {
                if(error){
                    response.status(500).send(error);
                }else{
                    response.status(201).json("Removed succesfully");
                }
            });
    }
    
    log.debug("lesson.api");
    apiRouter.get(apiRoot + '/:categoryid', getAllLessons);
    apiRouter.get(apiRoot + '/:categoryid/:id', getlessonById);
    apiRouter.post(apiRoot + '/:categoryid', createlesson);
    apiRouter.put(apiRoot + '/:id', modifylesson);
    apiRouter.delete(apiRoot + '/:id', deletelesson);

    log.info('lessons API initialized.');
    module.exports = apiRouter;

}());
