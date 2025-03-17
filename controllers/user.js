const checkUser = (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.redirect('/api-docs'); // Redirect to API docs on success
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
};

module.exports = { checkUser };
