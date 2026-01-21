"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

export default function EditContract() {
  const { id } = useParams();
  const router = useRouter();

  const { contracts, editContract } = useStore();

  const contract = contracts.find(
    (c) => c.id === id
  );

  const [clientName, setClientName] =
    useState(contract?.clientName || "");

  const [companyName, setCompanyName] =
    useState(contract?.companyName || "");

  if (!contract) {
    return (
      <div className="p-10 text-center text-slate-400">
        Contract not found
      </div>
    );
  }

function handleSave() {
  if (!contract) return; // 👈 add this line

  editContract(contract.id, {
    clientName,
    companyName,
  });

  toast.success("Contract updated successfully");
  router.push(`/contract/${contract.id}`);
}


  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-black mb-3"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl font-semibold tracking-tight">
          Edit Contract
        </h1>
        <p className="text-sm text-slate-500">
          Update client and company information
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">

        <div>
          <label className="text-sm font-medium">
            Client Name
          </label>
          <input
            value={clientName}
            onChange={(e) =>
              setClientName(e.target.value)
            }
            placeholder="Client name"
            className="w-full border px-4 py-2 rounded-md mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Company Name
          </label>
          <input
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            placeholder="Company name"
            className="w-full border px-4 py-2 rounded-md mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            onClick={() =>
              router.push(`/contract/${contract.id}`)
            }
            className="px-4 py-2 text-sm border rounded-md hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition"
          >
            <Save size={16} />
            Save Changes
          </button>

        </div>
      </div>

      {/* INFO PREVIEW */}
      <div className="bg-slate-50 border rounded-xl p-5 text-sm">

        <p className="font-medium mb-2">
          Current Contract Info
        </p>

        <div className="space-y-2 text-slate-600">
          <p>
            <b>Template:</b>{" "}
            {contract.blueprintName}
          </p>
          <p>
            <b>Status:</b>{" "}
            {contract.status}
          </p>
          <p>
            <b>Created:</b>{" "}
            {new Date(
              contract.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
