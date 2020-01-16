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
 * Product create test suite.
 */
describe('product create ', () => {
    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        expect(async () => {
            await productService.create(productComplete);
        })
            .not
            .toThrow();
    });

    /**
     * Tests that a product can be created without a description.
     */
    it('can be created without description', async () => {
        expect(async () => {
            await productService.create(productMissingDescription);
        })
            .not
            .toThrow();
    });

    /**
     * Product should exist after being created.
     */
    it('exists after being created', async () => {
        await productService.create(productComplete);

        const createdProduct = await productModel.findOne();

        expect(createdProduct.name)
            .toBe(productComplete.name);
    });

    /**
     * Should throw an error when product doesn't have a name or price.
     */
    it('requires name and price', async () => {
        await expect(productService.create(productMissingName))
            .rejects
            .toThrow(mongoose.Error.ValidationError);

        await expect(productService.create(productMissingPrice))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });
});

const productComplete = {
    name: 'iPhone 11',
    price: 699,
    description: 'A new dual‑camera system captures more of what you see and love. '
};

const productMissingDescription = {
    name: 'iPhone 11',
    price: 699
};

const productMissingName = {
    price: 699,
    description: 'A new dual‑camera system captures more of what you see and love. '
};

const productMissingPrice = {
    name: 'iPhone 11',
    description: 'A new dual‑camera system captures more of what you see and love. '
};