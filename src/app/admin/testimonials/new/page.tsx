import { addTestimonial } from "@/app/actions/testimonialActions";
import Link from "next/link";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/testimonials" className="text-gray-500 hover:text-brand">← Back</Link>
        <h2 className="text-2xl font-bold text-gray-800">Add Testimonial</h2>
      </div>

      <form action={addTestimonial} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
          <input required name="name" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand" placeholder="e.g. Rajat Sharma" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input required name="place" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand" placeholder="e.g. Delhi" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Display</label>
          <input required name="date" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand" placeholder="e.g. 2 weeks ago" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
          <textarea required name="quote" rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand" placeholder="Testimonial content..."></textarea>
        </div>

        <div className="pt-2">
          <button type="submit" className="w-full bg-brand text-white font-bold rounded-lg px-4 py-3 hover:bg-brand-dark transition-colors">
            Save Testimonial
          </button>
        </div>
      </form>
    </div>
  );
}
