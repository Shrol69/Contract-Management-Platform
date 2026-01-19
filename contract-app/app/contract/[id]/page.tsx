"use client";

import { useStore } from "@/store/useStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContractDetails() {
  const params = useParams();
  const router = useRouter();
  
  // Safe handling of the ID
  const id = typeof params?.id === 'string' ? params.id : '';

  const { contracts, updateStatus } = useStore();
  const [contract, setContract] = useState(contracts.find((c) => c.id === id));

  // Sync state when loading
  useEffect(() => {
    if (id) {
      setContract(contracts.find((c) => c.id === id));
    }
  }, [id, contracts]);

  if (!contract) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-8">
        <button onClick={() => router.back()} className="mb-4 text-gray-500 hover:text-black">
          ← Back
        </button>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{contract.blueprintName}</h1>
            <p className="text-gray-600">Client: {contract.clientName}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {contract.status}
          </span>
        </div>

        {/* LOGIC: Only show valid next steps */}
        <div className="flex gap-3 mt-8 pt-6 border-t">
          {contract.status === 'CREATED' && (
            <button onClick={() => updateStatus(contract.id, 'APPROVED')} className="bg-blue-600 text-white px-4 py-2 rounded">
              Approve
            </button>
          )}

          {contract.status === 'APPROVED' && (
            <button onClick={() => updateStatus(contract.id, 'SENT')} className="bg-purple-600 text-white px-4 py-2 rounded">
              Send
            </button>
          )}

          {contract.status === 'SENT' && (
            <button onClick={() => updateStatus(contract.id, 'SIGNED')} className="bg-green-600 text-white px-4 py-2 rounded">
              Sign
            </button>
          )}

          {contract.status === 'SIGNED' && (
            <button onClick={() => updateStatus(contract.id, 'LOCKED')} className="bg-gray-800 text-white px-4 py-2 rounded">
              Lock
            </button>
          )}

           {/* Revoke is always visible unless locked */}
           {contract.status !== 'LOCKED' && contract.status !== 'REVOKED' && (
            <button onClick={() => updateStatus(contract.id, 'REVOKED')} className="ml-auto text-red-500 border border-red-200 px-4 py-2 rounded">
              Revoke
            </button>
          )}
        </div>
      </div>
    </div>
  );
}