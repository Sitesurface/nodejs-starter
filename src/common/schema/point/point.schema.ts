import { Schema } from 'mongoose';

/**
 *  Pont schema which can be used with mongoose model for geolocation
 */
const PointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { _id: false },
);

export default PointSchema;
