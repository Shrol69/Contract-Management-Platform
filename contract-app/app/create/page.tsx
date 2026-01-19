"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateContract() {
  const { createContract } = useStore();
  const router = useRouter();

  const [blueprintName, setName] = useState("");
  const [clientName, setClient] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      createContract({
        blueprintName,
        clientName,
      });

      toast.success("Contract created successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Create New Contract
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-5 shadow-sm"
      >
        <div>
          <label className="text-sm font-medium">
            Contract Name
          </label>
          <input
            required
            value={blueprintName}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="NDA Agreement"
            className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Client Name
          </label>
          <input
            required
            value={clientName}
            onChange={(e) =>
              setClient(e.target.value)
            }
            placeholder="Acme Corp"
            className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
        >
          Create Contract
        </button>
      </form>
      {/* Live Preview */}
<div className="mt-10">
  <h2 className="font-medium mb-3">
    Live Preview
  </h2>

  <div className="bg-white border rounded-lg p-6">

    <h3 className="text-lg font-semibold">
      {blueprintName || "Contract Title"}
    </h3>

    <p className="text-sm text-slate-500 mb-4">
      Client: {clientName || "Client Name"}
    </p>

    <div className="space-y-3 text-sm">
      <p>
        This agreement is made between{" "}
        <b>
          {clientName || "Client"}
        </b>{" "}
        and Company.
      </p>

      <p>
        All confidential information must
        remain protected.
      </p>

      <div className="border-t pt-4">
        Signature: ____________
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
