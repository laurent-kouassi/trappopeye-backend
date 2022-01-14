import mongoose from 'mongoose';

import Geocode from './geocode';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { Geocode };

export { connectDb };

export default models;
