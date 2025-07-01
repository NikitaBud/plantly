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
  {
    name: 'Spathiphyllum',
    latin_name: 'Spathiphyllum',
    light_requirements: 'Bright, indirect light',
    watering_frequency: '1–2 times per week',
    humidity_preference: 'High',
    toxicity_info: 'Toxic to animals',
    image_url: '/images/Spathiphyllum.jpg',
    care_instructions: 'Keep the soil consistently moist. Mist regularly. Avoid direct sunlight.'
  },
  {
    name: 'Dracaena',
    latin_name: 'Dracaena',
    light_requirements: 'Indirect or filtered light',
    watering_frequency: 'Once per week',
    humidity_preference: 'Moderate',
    toxicity_info: 'Toxic to animals',
    image_url: '/images/Dracaena.jpg',
    care_instructions: 'Allow the top inch of soil to dry between waterings. Avoid fluoride in water.'
  },
  {
    name: 'Boston Fern',
    latin_name: 'Nephrolepis exaltata',
    light_requirements: 'Bright, indirect light or partial shade',
    watering_frequency: 'Keep soil moist',
    humidity_preference: 'High',
    toxicity_info: 'Non-toxic',
    image_url: '/images/Nephrolepis_exaltata.jpg',
    care_instructions: 'Mist daily or use a humidifier. Do not let the soil dry out completely.'
  },
  {
    name: 'Monstera',
    latin_name: 'Monstera deliciosa',
    light_requirements: 'Bright, indirect light',
    watering_frequency: 'Once per week',
    humidity_preference: 'Moderate to high',
    toxicity_info: 'Toxic to animals',
    image_url: '/images/Monstera_deliciosa.jpg',
    care_instructions: 'Water when the top inch of soil is dry. Wipe leaves occasionally.'
  },
  {
    name: 'Chinese Money Plant',
    latin_name: 'Pilea peperomioides',
    light_requirements: 'Bright, indirect light',
    watering_frequency: 'Once per week',
    humidity_preference: 'Moderate',
    toxicity_info: 'Non-toxic',
    image_url: '/images/Pilea_peperomioides.jpg',
    care_instructions: 'Let the soil dry slightly between watering. Rotate the plant for even growth.'
  },
  {
    name: 'Cactus',
    latin_name: 'Cactaceae',
    light_requirements: 'Direct sunlight',
    watering_frequency: 'Every 2–3 weeks',
    humidity_preference: 'Low',
    toxicity_info: 'Varies by species',
    image_url: '/images/Cactus.jpg',
    care_instructions: 'Use well-draining soil. Avoid overwatering. Provide as much sunlight as possible.'
  },
  {
    name: 'Alocasia',
    latin_name: 'Alocasia',
    light_requirements: 'Bright, indirect light',
    watering_frequency: '1–2 times per week',
    humidity_preference: 'High',
    toxicity_info: 'Toxic to animals',
    image_url: '/images/Alocasia.jpg',
    care_instructions: 'Keep the soil moist but not soggy. Mist frequently to maintain humidity.'
  },
  {
    name: 'Kalanchoe',
    latin_name: 'Kalanchoe',
    light_requirements: 'Bright light, some direct sunlight',
    watering_frequency: 'Every 1–2 weeks',
    humidity_preference: 'Low',
    toxicity_info: 'Toxic to animals',
    image_url: '/images/Kalanchoe.jpg',
    care_instructions: 'Allow the soil to dry completely between waterings. Avoid high humidity.'
  }
];

export const seedSpecies = async () => {
  await Species.deleteMany();
  const inserted = await Species.insertMany(speciesData);
  console.log(`Seeded ${ inserted.length } species.`);
  return inserted;
};