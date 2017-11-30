/**
 * @author  ibolyauveges
 * @since   0.0.1
 *
 * @description
 * This module exposes a Category prototype.
 * There is a prototype in the ui/entity/category.js
 *
 * @see     category.store.js
 * @see     category.api.js
 */
(function () {
    'use strict';

    const sanitizer = require('../../sanitizer/sanitizer');

    function sanitizeItem(item) {
        return {
            _id:           item._id, 
            id:            item.id,
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

    module.exports = function (_id, id, name, description, style, checked, creationDate) {
        this._id           = _id,
        this.id            = id,
        this.name          = sanitizer.sanitizeString(name);
        this.description   = sanitizer.sanitizeString(description);
        this.checked       = checked;
        this.style         = style,  
        this.creationDate  = creationDate ||  new Date();
    };

}());
