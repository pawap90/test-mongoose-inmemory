const productModel = require('../models/product');

/**
 * Stores a new product into the database.
 * @param {Object} product product object to create.
 * @throws {Error} If the product is not provided.
 */
module.exports.create = async (product) => {
    if (!product)
        throw new Error('Missing product');

    await productModel.create(product);
}

/**
 * Retrieves a product by id.
 * @param {String} id Product unique identifier
*/
module.exports.getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
};