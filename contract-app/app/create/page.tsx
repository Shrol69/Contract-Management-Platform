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

  const today = new Date().toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      createContract({
        blueprintName,
        clientName,
      });

      toast.success(
        "Contract created successfully!"
      );
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

      {/* LIVE PREVIEW */}
      <div className="mt-10">
        <h2 className="font-medium mb-3">
          Live Preview
        </h2>

        <div className="bg-white border rounded-lg p-6">

          <h3 className="text-lg font-semibold text-center">
            {blueprintName ||
              "Contract Title"}
          </h3>

          <p className="text-sm text-slate-500 text-center mb-4">
            Client:{" "}
            {clientName || "Client Name"}
          </p>

          <p className="text-xs text-slate-400 text-center mb-6">
            Date: {today}
          </p>

          <div className="space-y-3 text-sm leading-relaxed">

            <p>
              This agreement is made between{" "}
              <b>
                {clientName || "Client"}
              </b>{" "}
              and{" "}
              <b>
                Eurusys Technologies LLC
              </b>
              .
            </p>

            <p>
              Eurusys Technologies LLC is a
              technology-focused company
              delivering smart transformation
              solutions across the UAE and
              beyond.
            </p>

            <p>
              All confidential information must
              remain protected and shall not be
              disclosed to any third party.
            </p>

            <div className="border-t pt-4 mt-4">
              <p>
                Signature:
                ___________________
              </p>
              <p className="mt-2">
                Authorized by: Eurusys
                Technologies LLC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
