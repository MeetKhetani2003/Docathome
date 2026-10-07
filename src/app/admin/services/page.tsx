import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Services</h2>
        <Link href="/admin/services/new" className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors">
          Add Service
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow overflow-hidden p-6">
        {services.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No services in database yet. Add one to get started.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {services.map((s: any) => (
              <li key={s._id.toString()} className="py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{s.name}</h3>
                  <p className="text-sm text-gray-500">{s.slug} • {s.shortName}</p>
                </div>
                <div className="flex gap-3">
                  <Link href={`/admin/services/${s._id}`} className="text-blue-600 hover:text-blue-900 font-medium">Edit</Link>
                  <form action={async () => {
                      "use server";
                      await connectDB();
                      await Service.findByIdAndDelete(s._id);
                      revalidatePath("/admin/services");
                    }}>
                    <button type="submit" className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
