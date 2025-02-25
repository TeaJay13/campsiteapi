const express = require('express');
const router = express.Router();

const campsitesController = require('../controllers/campsites');

/**
 * @swagger
 * /campsites:
 *   get:
 *     summary: Get a list of campsites
 *     description: Retrieve a list of campsites from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of campsites.
 */
router.get('/', campsitesController.getAll);

/**
 * @swagger
 * /campsites/{_id}:
 *   get:
 *     summary: Get a single campsite
 *     description: Retrieve a single campsite from the database using the unique _id.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The MongoDB ObjectId of the campsite to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful request, campsite found.
 *       404:
 *         description: Campsite not found.
 */
router.get('/:id', campsitesController.getSingle);

/**
 * @swagger
 * /campsites:
 *   post:
 *     summary: Create a new campsite
 *     description: Add a new campsite to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - description
 *               - rating 
 *               - pricePerNight
 *               - amenities
 *               - accessibility
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mountain View Campground"
 *               location:
 *                 type: string
 *                 example: "Boise, ID"
 *               description:
 *                 type: string
 *                 example: "A beautiful campground with stunning views of the mountains."
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               pricePerNight:
 *                 type: number
 *                 example: 50
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tent sites", "RV sites", "showers", "restrooms"]
 *               accessibility:
 *                 type: string
 *                 example: "Drive in"
 *     responses:
 *       201:
 *         description: Campsite created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post('/', campsitesController.createCampsite);

/**
 * @swagger
 * /campsites/{_id}:
 *   put:
 *     summary: Update a campsite's information
 *     description: Update an existing campsite's details in the database.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The MongoDB ObjectId of the campsite to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               pricePerNight:
 *                 type: number
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               accessibility:
 *                 type: string
 *     responses:
 *       200:
 *         description: Campsite updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Campsite not found.
 */
router.put('/:id', campsitesController.updateCampsite);

/**
 * @swagger
 * /campsites/{_id}:
 *   delete:
 *     summary: Delete a campsite
 *     description: Remove a campsite from the database using their unique _id.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The MongoDB ObjectId of the campsite to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campsite deleted successfully.
 *       404:
 *         description: Campsite not found.
 */
router.delete('/:id', campsitesController.deleteCampsite);

module.exports = router;