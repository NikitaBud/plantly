import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedSpecies } from './seedSpecies.js';
import { seedUsers } from './seedUsers.js';
import { seedUserPlants } from './seedUserPlants.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const species = await seedSpecies();
    const user = await seedUsers();
    await seedUserPlants({ user, species });

    console.log('All data seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

run();