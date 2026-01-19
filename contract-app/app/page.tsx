"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge"; // Import our new component

export default function Dashboard() {
  const { contracts } = useStore();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contracts</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and track your legal documents</p>
        </div>
        <Link 
          href="/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Create New
        </Link>
      </div>

      {/* Filters Bar (Visual only for now) */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search contracts..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500"
          />
        </div>
        <select className="border border-gray-200 rounded-md px-4 py-2 text-sm bg-gray-50 text-gray-600 outline-none">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Signed</option>
        </select>
      </div>

      {/* The Professional Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contract Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No contracts found. Create one to get started.
                </td>
              </tr>
            ) : (
              contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">{contract.blueprintName}</td>
                  <td className="px-6 py-4 text-gray-600">{contract.clientName}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(contract.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/contract/${contract.id}`} 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                      View
                    </Link>
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