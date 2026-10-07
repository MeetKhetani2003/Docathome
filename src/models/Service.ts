import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true },
});

const ServiceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  icon: { type: String, required: true },
  summary: { type: String, required: true },
  intro: { type: String, required: true },
  covers: [{ type: String }],
  who: { type: String, required: true },
  expect: [{ type: String }],
  usefulWhen: [{ type: String }],
  faqs: [FaqSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
