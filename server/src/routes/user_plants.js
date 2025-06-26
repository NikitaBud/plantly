import express from 'express';
import {
  createUserPlant,
  getUserPlants,
  getSingleUserPlant,
  updateUserPlant,
  deleteUserPlant,
} from '../controllers/user-plants.js';

const router = express.Router();

router.route('/').get(getUserPlants).post(createUserPlant);
router.route('/:id').get(getSingleUserPlant).patch(updateUserPlant).delete(deleteUserPlant);

export default router;