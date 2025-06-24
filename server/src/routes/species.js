import express from 'express';
import {
  getAllSpecies,
  getPlant,
  addPlant,
  updatePlant,
  deletePlant,
  searchPlants
} from '../controllers/species.js';

const router = express.Router();

router.route('/').get(getAllSpecies).post(searchPlants);
router.route('/:id').get(getPlant).post(addPlant).patch(updatePlant).delete(deletePlant);

export default router;