const jwt = require('jsonwebtoken');

exports.facebookCallback = (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.cookie('jwt', token, { httpOnly: true, secure: false });
  res.redirect('/');
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};
