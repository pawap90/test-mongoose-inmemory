'use strict';

const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const productService = require('../src/services/product');
const productModel = require('../src/models/product');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Seed the database.
 */
beforeEach(async () => {
    await createProducts();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.closeDatabase();
});

/**
 * Product getById test suite.
 */
describe('product getById ', () => {
    /**
     * Should return null if getById doesn't find any product with the provided id.
     */
    it('should return null if nothing is found', async () => {
        await expect(productService.getById(mongoose.Types.ObjectId()))
            .resolves
            .toBeNull();
    });

    /**
     * Should return the correct product if getById finds the product with the provided id.
     */
    it('should retrieve correct product if id matches', async () => {
        const foundProduct = await productService.getById(productIphoneId);

        expect(foundProduct.id).toBe(productIphoneId);
        expect(foundProduct.name).toBe(productIphone.name);
    });
});

/**
 * Seed the database with products.
 */
const createProducts = async () => {
    const createdIphone = await productModel.create(productIphone);
    productIphoneId = createdIphone.id;
    await productModel.create(productFitbit);
};

let productIphoneId;

const productIphone = {
    name: 'iPhone 11',
    price: 699,
    description: 'A new dual‑camera system captures more of what you see and love. '
};

const productFitbit = {
    name: 'Fitbit Inspire HR',
    price: 699,
    description: 'Get empowered to make a change and embrace your weight and fitness goals... '
};