"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditContract() {
  const { id } = useParams();
  const router = useRouter();

  const {
    contracts,
    blueprints,
    editContract,
  } = useStore();

  const contract = contracts.find(
    (c) => c.id === id
  );

  if (!contract) {
    return (
      <div className="p-6">
        Contract not found
      </div>
    );
  }

  const [form, setForm] = useState({
    clientName: contract.clientName,
    companyName: contract.companyName,
    blueprintId: contract.blueprintId,
  });

  function handleSave() {
    editContract(contract.id, {
      clientName: form.clientName,
      companyName: form.companyName,
      blueprintId: form.blueprintId,
      blueprintName:
        blueprints.find(
          (b) => b.id === form.blueprintId
        )?.name || contract.blueprintName,
    });

    toast.success("Contract updated");
    router.push(`/contract/${id}`);
  }

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Edit Contract
      </h1>

      <div className="bg-white border rounded-xl p-6 space-y-4">

        {/* TEMPLATE */}
        <div>
          <label className="text-sm font-medium">
            Template
          </label>

          <select
            value={form.blueprintId}
            onChange={(e) =>
              setForm({
                ...form,
                blueprintId: e.target.value,
              })
            }
            className="w-full border px-4 py-2 rounded-md mt-1 text-sm"
          >
            {blueprints.map((b) => (
              <option
                key={b.id}
                value={b.id}
              >
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* CLIENT */}
        <div>
          <label className="text-sm font-medium">
            Client Name
          </label>

          <input
            value={form.clientName}
            onChange={(e) =>
              setForm({
                ...form,
                clientName: e.target.value,
              })
            }
            className="w-full border px-4 py-2 rounded-md mt-1 text-sm"
          />
        </div>

        {/* COMPANY */}
        <div>
          <label className="text-sm font-medium">
            Company Name
          </label>

          <input
            value={form.companyName}
            onChange={(e) =>
              setForm({
                ...form,
                companyName: e.target.value,
              })
            }
            className="w-full border px-4 py-2 rounded-md mt-1 text-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
