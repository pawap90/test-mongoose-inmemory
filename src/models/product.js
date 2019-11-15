'use strict';

const mongoose = require('mongoose');

/**
 * Product model schema.
 */
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }
});

module.exports = mongoose.model('product', productSchema);