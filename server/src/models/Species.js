import mongoose from 'mongoose';

const SpeciesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latin_name: {
    type: String,
    required: true,
  },
  light_requirements: {
    type: String,
    required: true,
  },
  watering_frequency: {
    type: String,
    required: true,
  },
  humidity_preference: {
    type: String,
    required: true,
  },
  toxicity_info: {
    type: String,
    default: 'No data',
  },
  image_url: {
    type: String,
    default: '',
  },
  care_instructions: {
    type: String,
    default: '',
  },
})

export default mongoose.model('Species', SpeciesSchema);