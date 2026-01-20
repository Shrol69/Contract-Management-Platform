"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import toast from "react-hot-toast";

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
      <div className="p-6">
        Contract not found
      </div>
    );
  }

  function handleSave() {
    editContract(contract.id, {
      clientName,
      companyName,
    });

    toast.success("Contract updated");
    router.push(`/contract/${contract.id}`);
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <h1 className="text-2xl font-semibold">
        Edit Contract
      </h1>

      <div className="bg-white border rounded-xl p-6 space-y-4">

        <div>
          <label className="text-sm font-medium">
            Client Name
          </label>
          <input
            value={clientName}
            onChange={(e) =>
              setClientName(e.target.value)
            }
            className="w-full border px-4 py-2 rounded-md mt-1"
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
            className="w-full border px-4 py-2 rounded-md mt-1"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
