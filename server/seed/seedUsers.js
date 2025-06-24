import User from '../src/models/User.js';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  await User.deleteMany();
  const hashedPassword = await bcrypt.hash(process.env.DEMO_PASS, 10);

  const user = await User.create({
    name: 'John Doe',
    email: 'johndoedemo@plantly.app',
    password: hashedPassword,
  });

  console.log('Seeded user: johndoedemo@plantly.app');
  return user;
};