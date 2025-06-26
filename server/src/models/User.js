import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
  }
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.getUserName = function (next) {
  return this.name;
}

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {userId: this._id, name: this.name},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_LIFETIME}
  )
}

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

export default mongoose.model('User', UserSchema);
