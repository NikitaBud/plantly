import UserPlant from '../src/models/UserPlant.js';

export const seedUserPlants = async ({ user, species }) => {
  await UserPlant.deleteMany();

  const plants = [
    {
      user_id: user._id,
      nickname: 'Ficus in the bedroom',
      species_id: species[0]._id,
      location: 'Bedroom',
    },
    {
      user_id: user._id,
      nickname: 'Snake plant in the kitchen',
      species_id: species[1]._id,
      location: 'Kitchen',
    },
  ];

  const inserted = await UserPlant.insertMany(plants);
  console.log(`Seeded ${inserted.length} user plants.`);
};