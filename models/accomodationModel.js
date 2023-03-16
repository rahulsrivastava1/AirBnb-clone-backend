import mongoose from "mongoose";

const accomodationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  id: {
    type: String,
  },
});

export default mongoose.model("Accomodation", accomodationSchema);
