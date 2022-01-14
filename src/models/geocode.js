import mongoose from 'mongoose';

const gecodeSchema = new mongoose.Schema(
  {
    route: String,
    // type: String,
    coordinates: Array,
  }
);

const Geocode = mongoose.model('Geocode', gecodeSchema);

export default Geocode;
