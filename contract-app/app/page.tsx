"use client"; // This is a client component because we need interaction

import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import Link from "next/link";

export default function Dashboard() {
  const { contracts } = useStore();

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Contract Dashboard</h1>
        {/* Link to create page (we will build this next) */}
        <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Contract
        </Link>
      </div>

      <div className="border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Contract Name</th>
              <th className="p-4 font-medium text-gray-600">Client</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Created Date</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{contract.blueprintName}</td>
                <td className="p-4 text-gray-600">{contract.clientName}</td>
                <td className="p-4">
                  {/* Visual logic for Status Colors */}
                  <span className={`px-2 py-1 rounded text-xs font-bold
                    ${contract.status === 'SIGNED' ? 'bg-green-100 text-green-800' : 
                      contract.status === 'SENT' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {contract.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">
                  {format(new Date(contract.createdAt), 'MMM dd, yyyy')}
                </td>
                <td className="p-4">
                  <Link href={`/contract/${contract.id}`} className="text-blue-600 hover:underline">
                    View & Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}