import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartdata: { type: Object, default: {} } 
  },
  { minimize: false } // keep empty objects in default
);

// Check if model exists, else create
const usermodel = mongoose.models.User || mongoose.model('User', userSchema);

export default usermodel;
