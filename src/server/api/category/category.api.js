/**
 * @author  ibolya.uveges
 * @since   0.0.1
 *
 * @description
 * This module defines REST HTTP endpoints for
 * manipulating category in LearnToKnow Application
 *
 * @see     category.store.js
 * @see     category.model.js
 */
(function () {
    'use strict';

    const log = require('../../logger/logger');

    //this is an url
    const apiRoot = '/category';
   
    //express modul
    const express   = require('express');

    //this is without filename extension
    let SanitizedCategory       = require('./category.model');
    const store  = require('./category.store');

    //the intantiate of the express modul
    let apiRouter = express.Router();

    //implement the communication on different method
   
    function getAllCategories(request, response) {
            //request.query contains parameters that is after ? 
            //request.params  contains parameters that is before ? (for example :id)
            let searchTerm = request.query.searchString;

            if (searchTerm) {
                //store is an own nodejs module    
                store.findInTitle(searchTerm, (categories) => {
                    response.status(200).json(categories);
                }, (error) => {
                    response.status(500).send(error);
                });
            } else {
                store.findAll((categories) => {
                    response.status(200).json(categories);
                }, (error) => {
                    response.status(500).send(error);
                });
            }
        }
     function getCategoryById(request, response) {
            //request.params  contains parameters that is before ? (for example :id)
            let id = parseInt(request.params.id, 10);
            if (id === undefined || isNaN(id)) {
                response.status(400).send('Wrong ID parameter!');
                return;
            }

            store.findById(id, (categories) => {
                response.status(200).json(categories);
            }, (error) => {
                response.status(500).send(error);
            });
    }

    function createCategory(request, response){
        log.debug("createCategory "+request);
            //request.body: this is the data in POST or PUT methods of http
            let category = request.body;
            log.debug(category);
            if (!category || category.name === undefined || category.name === "") {
                response.status(400).send('Invalid category to save!');
                return;
            }

            store.addCategory(new SanitizedCategory(category._id,category.id,category.name, category.description, category.style, category.checked), (newCategory) => {
                response.status(200).json(newCategory); 
            }, (error) => {
                response.status(500).send(error);
            });
    }
    function modifyCategory(request, response){
            let category = request.body;
            let id = parseInt(request.params.id, 10);
            if (!category) {
                response.status(400).send('Invalid category to modify!');
                return;
            }

            store.modCategory(new SanitizedCategory(category._id,category.id,category.name, category.description, category.style, category.checked,category.lessons,category.creationDate),
                              (error,docs) => {
                if(error){
                    response.status(500).send(error);
                }else{
                    response.status(201).json(docs);
                }
            });
    }
    function deleteCategory(request, response){
            let id = parseInt(request.params.id, 10);
            if (!id) {
                response.status(400).send('Wrong ID parameter!');
                return;
            }

            store.delCategory(id, (error) => {
                if(error){
                    response.status(500).send(error);
                }else{
                    response.status(201).json("Removed succesfully");
                }
            });
    }
    function isTypeOfCard(typeOfCard){
        if (typeOfCard == "DICTIONARY") return true;
        if (typeOfCard == "GAP-FILL") return true; 
        if (typeOfCard == "MULTI-CHOICE") return true;
        if (typeOfCard == "TRANSLATE") return true;
        if (typeOfCard == "QUESTIONING") return true;
        return false;
    }

    apiRouter.get(apiRoot, getAllCategories);
    apiRouter.get(apiRoot + '/:id', getCategoryById);
    apiRouter.post(apiRoot, createCategory);
    apiRouter.put(apiRoot + '/:id', modifyCategory);
    apiRouter.delete(apiRoot + '/:id', deleteCategory);

    log.info('Categories API initialized.');
    module.exports = apiRouter;

}());
