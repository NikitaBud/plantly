import mongoose from 'mongoose';

const UserPlantSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  species_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('UserPlant', UserPlantSchema);