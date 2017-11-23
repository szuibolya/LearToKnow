/**
 * @author  ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This module provides data manipulation operations
 * on lesson objects.
 * The underlying store is a persistent NeDB database.
 * Configuration can be found in config/default.js.
 *
 * @see     lesson.model.js
 * @see     lesson.api.js
 */
(function () {
    'use strict';

    const log       = require('../../logger/logger');
    const mongoose  = require('../../database/database');
    let Sanitizedlesson       = require('./lesson.model');
    
    //this is a model for the lessons Collection
    //second parameter is a schema for the type of the collection's fields
    const database = mongoose.model('lessons', new mongoose.Schema({id:Number, categoryId: Number, name:String,description:String,checked:Number,
                style: {cardBackGroundColor:String,cardBackGroundColorClass:String,
                        cardForeGroundColor:String,cardForeGroundColorClass:String,
                        cardFontName:String,cardFontSize:Number}, creationDate: { type: Date, default: Date.now }}));

    //this will be returned with the methods of this modul
    let operations = {};

    //creates a new lesson: lesson is the data for insertion
    //onSucces and onError are callback functions
    operations.addlesson = function (lesson, onSuccess, onError) {
        log.debug('Saving new lesson...');
        if (!(lesson instanceof Sanitizedlesson)) {
            throw new Error('Invalid lesson to insert!');
        }

        if (!lesson.id) { lesson.id = Date.now(); }
        database.create(lesson, (error, newlesson) => {
            if (error) {
                onError(error);
                return;
            }

            log.debug('New lesson has been successfully saved with id %d.', lesson.id);
            onSuccess(newlesson);
        });
    };

    //modifies a lesson: lesson is the data for update
    operations.modlesson = function (lesson, response) {
        log.debug('Update lesson...');
        if (!(lesson instanceof Sanitizedlesson)) {
            throw new Error('Invalid lesson to update!');
        }

        if (!lesson.id) { lesson.id = Date.now(); }
        database.findOneAndUpdate({ id: lesson.id}, 
        {   name: lesson.name,
            description:lesson.description,
            style:lesson.style
        },
        {upsert:true},
          response //this is the callback function
        );
        
    };

     //delete a lesson
     operations.dellesson = function (id, response) {
        log.debug('Delete a lesson with id=%d...', id);
        if (!id) {
            throw new Error('Wrong ID!');
        }

        database.remove({ id: id}, 
             response //this is the callback function
        );
        
    };
    //retrieves the all lessons
    operations.findAll = function (categoryid, onSuccess, onError) {
        log.debug('Retrieving every lesson with %d categoryId...',categoryid);
        database.find({categoryId: categoryid}, function(error, lessons){
            if (error) {
                onError(error);
                return;
            }else{
                log.debug('Found %d lessons.', lessons.length);
                onSuccess(lessons);
            }
        });
    };

    //returns one lesson with a particular id
    operations.findById = function (id, onSuccess, onError) {
        log.debug('Getting lesson with ID %d...', id);
        database.findOne({ id: id }, (error, lesson) => {
            if (error || !lesson) {
                onError(error);
                return;
            }

            onSuccess(lesson); 
        });
    };

    //retrieves those docs from the lessons Collection whose name contains the given search string:namePart
    operations.findInTitle = function (categoryid,namePart, onSuccess, onError) {
        log.debug('Finding lessons with categoryid %d "%s" in the name...', categoryid, namePart);
        database.find({categoryId: categoryid, name: new RegExp(namePart, 'g') },
         function(error, lessons){
            if (error) {
                onError(error);
                return;
            }

            log.debug('Found %d lessons matching the search term in their name.', lessons.length);
            onSuccess(lessons);
        });
    };

    module.exports = operations;

}());
