// models
const User = require('../../models/user');
// bcrypt
const bcrypt = require('bcryptjs');
// jwt
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async ({ email, password, firstName, lastName }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
      const result = await user.save();

      return { ...result._doc, password: null };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error('Password is incorrect'); // Invalid Credentials
    }

    const token = jwt.sign(
      {userId: user.id, email: user.email},
      'myprivatekeythatshouldbestorageontheserver',
      { expiresIn: '1h' }
      );

    return { userId: user.id, token: token, tokenExpiration: 1};

  }
};
