import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  patient: { type: String, required: true },
  age: { type: String, required: true },
  address: { type: String, required: true },
  timing: { type: String, required: true },
  service: { type: String, required: true },
  problem: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
