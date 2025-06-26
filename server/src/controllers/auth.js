import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import UnauthenticatedError from '../errors/unauthenticated.js';

const register = async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Username and password are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('User does not exist');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid email or password');
  }

  const token = user.createJWT();
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 30 * 60 * 60 * 1000,
    })
    .status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

const logout = async (req, res, next) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    })
    .status(200)
    .json({ msg: 'Logged out successfully' });
}

export default { register, login, logout };