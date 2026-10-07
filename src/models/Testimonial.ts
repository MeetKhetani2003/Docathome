import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  quote: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
