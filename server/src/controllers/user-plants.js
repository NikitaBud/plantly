import Errors from '../errors/index.js';
import mongoose from 'mongoose';
import UserPlant from '../models/UserPlant.js';
import { StatusCodes } from 'http-status-codes';
import Species from '../models/Species.js';

export const createUserPlant = async (req, res) => {
  const { nickname, species_id, location } = req.body;
  const user_id = req.user.userId;

  if (!nickname || !species_id) {
    throw new Errors.NotFoundError('Nickname and species_id are required');
  }

  if (!mongoose.Types.ObjectId.isValid(species_id)) {
    throw new Errors.BadRequestError('Invalid species_id');
  }

  const species = await Species.findOne({ _id: species_id });
  if (!species) {
    throw new Errors.NotFoundError('Species_id not found');
  }

  const newPlant = await UserPlant.create({
    user_id,
    nickname,
    species_id,
    location,
  })

  res.status(StatusCodes.OK).json({ newPlant });
}

export const getUserPlants = async (req, res) => {
  const user_id = req.user.userId;

  const plants = await UserPlant.find({ user_id }).populate('species_id');

  res.status(StatusCodes.OK).json({ count: plants.length, plants });
}

export const getSingleUserPlant = async (req, res) => {
  const { id: plant_id } = req.params;
  const user_id = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(plant_id)) {
    throw new Errors.BadRequestError('Invalid plant ID');
  }

  const plant = await UserPlant.findOne({ _id: plant_id, user_id }).populate('species_id');
  if (!plant) {
    throw new Errors.NotFoundError('User plant not found.');
  }

  res.status(StatusCodes.OK).json({ plant });
}

export const updateUserPlant = async (req, res) => {
  const { id: plant_id } = req.params;
  const userId = req.user.userId;
  const { nickname, location } = req.body;

  if (!nickname || !location) {
    throw new Errors.BadRequestError('Nothing to update');
  }

  const plant = await UserPlant.findOneAndUpdate(
    { _id: plant_id, user_id: userId },
    { nickname, location },
    { new: true, runValidators: true }
  );

  if (!plant) {
    throw new Errors.NotFoundError('User plant not found.');
  }

  res.status(StatusCodes.OK).json({ plant });
}

export const deleteUserPlant = async (req, res) => {
  const { id: plantId } = req.params;
  const user_id = req.user.userId;

  const plant = await UserPlant.findOneAndDelete({ _id: plantId, user_id });
  if (!plant) {
    throw new Errors.NotFoundError('User plant not found.');
  }

  res.status(StatusCodes.OK).json({ msg: 'User plant deleted successfully.' });
}

