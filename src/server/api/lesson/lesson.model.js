/**
 * @author  ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This module exposes a lesson prototype.
 * There is a prototype in the ui/entity/lesson.js
 *
 * @see     lesson.store.js
 * @see     lesson.api.js
 */
(function () {
    'use strict';

    const sanitizer = require('../../sanitizer/sanitizer');

    function sanitizeItem(item) {
        return {
            _id:           item._id,
            id:            item.id,
            categoryId:    item.categoryId,
            checked:       item.checked,
            name:          sanitizer.sanitizeString(item.name),
            description:   sanitizer.sanitizeString(item.description),
            checked:       item.checked,
            style:         item.style,  
            creationDate:  item.creationDate
        };
    }

    function sanitizeItems(items) {
        if (!items) { return []; }
        return items.map((item) => {
            return sanitizeItem(item);
        });
    }

    module.exports = function (_id, id, categoryId, name, description, style, checked, lessons, creationDate) {
        this._id           = _id,
        this.id            = id,
        this.categoryId    = categoryId,
        this.name          = sanitizer.sanitizeString(name);
        this.description   = sanitizer.sanitizeString(description);
        this.style         = style;
        this.checked       = checked;
        this.creationDate  = creationDate ||  new Date();
        this.lessons       = lessons == undefined ?[] : sanitizeItems(lessons);
    };

}());