import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function NewServicePage() {
  async function addService(formData: FormData) {
    "use server";
    await connectDB();
    
    // Basic fields
    const slug = formData.get("slug") as string;
    const name = formData.get("name") as string;
    const shortName = formData.get("shortName") as string;
    const icon = formData.get("icon") as string;
    const summary = formData.get("summary") as string;
    const intro = formData.get("intro") as string;
    const who = formData.get("who") as string;

    // Array fields (comma separated for simplicity in this basic form)
    const coversStr = formData.get("covers") as string;
    const covers = coversStr ? coversStr.split(",").map(s => s.trim()) : [];
    
    const expectStr = formData.get("expect") as string;
    const expect = expectStr ? expectStr.split(",").map(s => s.trim()) : [];

    await Service.create({
      slug, name, shortName, icon, summary, intro, who, covers, expect, usefulWhen: [], faqs: []
    });

    revalidatePath("/");
    revalidatePath("/admin/services");
    redirect("/admin/services");
  }

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/services" className="text-gray-500 hover:text-brand">← Back</Link>
        <h2 className="text-2xl font-bold text-gray-800">Add New Service</h2>
      </div>

      <form action={addService} className="bg-white p-6 rounded-xl shadow space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input required name="name" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. Injection at home" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input required name="slug" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. injection" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Name</label>
            <input required name="shortName" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. Injection" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name</label>
            <input required name="icon" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. syringe" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary (Short)</label>
          <input required name="summary" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Short description..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Intro (Detailed)</label>
          <textarea required name="intro" rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Detailed introduction for slug page..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Who needs this?</label>
          <input required name="who" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. Anyone requiring IV fluids..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Covers (Comma separated)</label>
          <input name="covers" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Item 1, Item 2, Item 3" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What to expect (Comma separated)</label>
          <input name="expect" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Step 1, Step 2, Step 3" />
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full bg-brand text-white font-bold rounded-lg px-4 py-3 hover:bg-brand-dark transition-colors">
            Save Service
          </button>
        </div>
      </form>
    </div>
  );
}
