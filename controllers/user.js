const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const checkUser = (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.redirect('/api-docs'); // Redirect to API docs on success
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
};

const getAllUsers = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

module.exports = { checkUser, getAllUsers };
