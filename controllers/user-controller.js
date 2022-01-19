const {User} = require('./../database/schema')
const bcrypt = require('bcrypt');

exports.login = async () => {
  throw new Error('Not implemented!');
};

exports.logout = () => {
  throw new Error('Not implemented!');
};

exports.register = async (req, res) => {
  try {
      const user = req.body;

      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
      console.log(user);

      const newUser = await User.create(user);
      // console.log(newUser);
      // const newUser = await UserModel.find();
      res.status(201).json({
          status: 'success',
          data: newUser
      })
  } catch (error) {
      res.status(400).json({
          status: 'fail',
          message: error.message
      })
  }
};
exports.activate = () => {
  throw new Error('Not implemented!');
};
exports.index = () => {
  throw new Error('Not implemented yet!');
};
