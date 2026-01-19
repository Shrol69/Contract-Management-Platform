"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function CreateContract() {
  const router = useRouter();
  const addContract = useStore((state) => state.addContract);

  // Simple form state
  const [clientName, setClientName] = useState("");
  const [blueprint, setBlueprint] = useState("NDA Agreement");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the new contract object
    const newContract = {
      id: Math.random().toString(36).substr(2, 9),
      blueprintName: blueprint,
      clientName: clientName,
      status: "CREATED" as const,
      createdAt: new Date().toISOString(),
    };

    // Save to store
    addContract(newContract);

    // Go back to dashboard
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">New Contract</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Client Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input 
              required
              type="text" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Acme Corp"
            />
          </div>

          {/* Blueprint Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
            <select 
              value={blueprint}
              onChange={(e) => setBlueprint(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="NDA Agreement">NDA Agreement</option>
              <option value="Employment Offer">Employment Offer</option>
              <option value="Service Contract">Service Contract</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="w-1/2 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="w-1/2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            >
              Create Contract
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}