/**
 * @author  ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This module exposes a lesson prototype.
 * There is a prototype in the ui/entity/lesson.js
 *
 * @see     card.store.js
 * @see     card.api.js
 */
(function () {
    'use strict';

    const sanitizer = require('../../sanitizer/sanitizer');

    function sanitizeItem(item) {
        return {
            _id:           item._id,
            id:            item.id,
            categoryId:    item.categoryId,
            lessonId:      item.lessonId,
            typeOfCard:    item.typeOfCard,
            question:      sanitizer.sanitizeString(item.question),
            answer:        sanitizer.sanitizeString(item.answer),
            answerA:       sanitizer.sanitizeString(item.answerA),
            answerB:       sanitizer.sanitizeString(item.answerB),
            answerC:       sanitizer.sanitizeString(item.answerC),
            creationDate:  item.creationDate
        };
    }

    function sanitizeItems(items) {
        if (!items) { return []; }
        return items.map((item) => {
            return sanitizeItem(item);
        });
    }    

    module.exports = function (_id, id, categoryId, lessonId, question, answer, typeOfCard, answerA, answerB, answerC, creationDate) {
        this._id        = _id,
        this.id         = id,
        this.categoryId = categoryId,
        this.lessonId   = lessonId,
        this.typeOfCard = typeOfCard,
        this.question   = sanitizer.sanitizeString(question),
        this.answer     = sanitizer.sanitizeString(answer),
        this.answerA    = sanitizer.sanitizeString(answerA),
        this.answerB    = sanitizer.sanitizeString(answerB),
        this.answerC    = sanitizer.sanitizeString(answerC),
        this.creationDate = creationDate ||  new Date();
    };

}());