const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('campsites').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const campsiteId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('campsites')
    .find({ _id: campsiteId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createCampsite = async (req, res) => {
  const campsite = {
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    amenities: req.body.amenities,
    price: req.body.price,
    availability: req.body.availability,
    rating: req.body.rating
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('campsites')
    .insertOne(campsite);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the campsite.');
  }
};

const updateCampsite = async (req, res) => {
  const campsiteId = new ObjectId(req.params.id);
  const campsite = {
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    amenities: req.body.amenities,
    price: req.body.price,
    availability: req.body.availability,
    rating: req.body.rating
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('campsites')
    .replaceOne({ _id: campsiteId }, campsite);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the campsite.');
  }
};

const deleteCampsite = async (req, res) => {
  const campsiteId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('campsites')
    .deleteOne({ _id: campsiteId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the campsite.');
  }
};

module.exports = { getAll, getSingle, createCampsite, updateCampsite, deleteCampsite };
