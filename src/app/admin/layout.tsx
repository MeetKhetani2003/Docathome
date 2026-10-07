import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-brand-deep">Docathome Admin</h1>
        </div>
        <nav className="mt-6 flex flex-col gap-2 px-4">
          <Link href="/admin/inquiries" className="rounded-lg px-4 py-2 text-gray-700 hover:bg-brand-tint hover:text-brand">
            Inquiries
          </Link>
          <Link href="/admin/testimonials" className="rounded-lg px-4 py-2 text-gray-700 hover:bg-brand-tint hover:text-brand">
            Testimonials
          </Link>
          <Link href="/admin/services" className="rounded-lg px-4 py-2 text-gray-700 hover:bg-brand-tint hover:text-brand">
            Services
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
