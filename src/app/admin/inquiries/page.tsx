import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  await connectDB();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inquiries</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No inquiries yet.</td>
              </tr>
            ) : (
              inquiries.map((inq: any) => (
                <tr key={inq._id.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(inq.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {inq.patient} ({inq.age}y)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inq.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inq.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inq.timing}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
