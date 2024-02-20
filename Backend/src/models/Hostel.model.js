import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const HostelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

HostelSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Hostel = mongoose.model("Hostel", HostelSchema);

export default Hostel;