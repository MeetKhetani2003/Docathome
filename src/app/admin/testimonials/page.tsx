import connectDB from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import Link from "next/link";
import { deleteTestimonial } from "@/app/actions/testimonialActions";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
        <Link href="/admin/testimonials/new" className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors">
          Add Testimonial
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No testimonials yet. Add one above!</td>
              </tr>
            ) : (
              testimonials.map((t: any) => (
                <tr key={t._id.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.place}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={t.quote}>{t.quote}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <form action={async () => {
                      "use server";
                      await deleteTestimonial(t._id.toString());
                    }}>
                      <button type="submit" className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
