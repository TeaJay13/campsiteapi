const checkUser = (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.redirect('/api-docs'); // Redirect to API docs on success
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
};

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

module.exports = { checkUser, getAllUsers };
