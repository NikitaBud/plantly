import mongoose from 'mongoose';
import Species from '../models/Species.js';
import { StatusCodes } from 'http-status-codes';
import Errors from '../errors/index.js';

export const getAllSpecies = async (req, res) => {
  const species = await Species.find();
  res.status(StatusCodes.OK).json({ species: species, count: species.length });
}

export const getPlant = async (req, res) => {
  const { id: speciesId } = req;

  if (!mongoose.Types.ObjectId.isValid(speciesId)) {
    throw new Errors.BadRequestError('Invalid plant ID');
  }

  const plant = await Species.findOne(speciesId);

  if (!plant) {
    throw new Errors.NotFoundError('Plant not found.');
  }

  res.status(StatusCodes.OK).json({ plant });
}

export const addPlant = async (req, res) => {
  try {
    const plant = await Species.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, plant });
  } catch (e) {
    throw new Errors.BadRequestError('Invalid data for plant creation');
  }
}

export const updatePlant = async (req, res) => {
  const { id: speciesId } = req.params;

  const updatedPlant = await Species.findOneAndUpdate(
    speciesId,
    req.body,
    { new: true, runValidators: true }
  )

  if (!updatedPlant) {
    throw new Errors.NotFoundError(`Plant with the ID ${ speciesId } not found.`);
  }

  res.status(StatusCodes.OK).json({ plant: updatedPlant });
}

export const deletePlant = async (req, res) => {
  const { id: plantId } = req;

  if (!mongoose.Types.ObjectId.isValid(speciesId)) {
    throw new Errors.BadRequestError('Invalid plant ID');
  }

  const plant = await Species.findOneAndDelete(plantId);

  if (!plant) {
    throw new Errors.NotFoundError(`Plant with the ID ${ plantId } was not found.`);
  }

  res.status(StatusCodes.OK).send({ msg: 'Plant deleted successfully.' });
}

export const searchPlants = async (req, res) => {
  const { name, light, humidity, toxic } = req.query;

  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (light) {
    queryObject.light_requirements = { $regex: light, $options: 'i' };
  }

  if (humidity) {
    queryObject.humidity_preference = { $regex: humidity, $options: 'i' };
  }

  if (toxic === 'true') {
    queryObject.toxicity_info = { $ne: 'No' };
  }

  const plants = await Species.find(queryObject);

  res.status(StatusCodes.OK).json({ count: plants.length, plants });
};