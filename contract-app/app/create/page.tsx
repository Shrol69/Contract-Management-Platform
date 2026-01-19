"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateContract() {
  const { createContract } = useStore();
  const router = useRouter();

  const [blueprintName, setName] =
    useState("");
  const [clientName, setClient] =
    useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    createContract({
      blueprintName,
      clientName,
    });

    router.push("/");
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
        >
          Create Contract
        </button>
      </form>
    </div>
  );
}
