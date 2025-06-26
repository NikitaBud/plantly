import Species from '../src/models/Species.js';

const speciesData = [
  {
    name: 'Ficus Benjamina',
    latin_name: 'Ficus benjamina',
    light_requirements: 'Bright diffused light',
    watering_frequency: '1 time per week',
    humidity_preference: 'Moderate',
    toxicity_info: 'Toxic to animals',
    image_url: '',
    care_instructions: 'Do not overwater. Mist the leaves once a week.',
  },
  {
    name: 'Sansevieria',
    latin_name: 'Sansevieria trifasciata',
    light_requirements: 'Shade or partial shade',
    watering_frequency: 'Once every 2-3 weeks',
    humidity_preference: 'Low',
    toxicity_info: 'Slightly toxic',
    image_url: '',
    care_instructions: 'Water sparingly. Suitable for beginners.',
  },
];

export const seedSpecies = async () => {
  await Species.deleteMany();
  const inserted = await Species.insertMany(speciesData);
  console.log(`Seeded ${inserted.length} species.`);
  return inserted;
};