const bcrypt = require('bcrypt');
const { findUserByEmail, findUserById } = require('../repositories/auth.repository');
const { generateToken } = require('../utils/generateToken');
bcrypt.hash("admin123", 10).then(console.log);
const login = async (email, password) => {
  const user = await findUserByEmail(email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  
  return {
    token,
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role
    }
  };
};

const getMe = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = { login, getMe };