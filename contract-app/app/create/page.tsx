"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function CreateContract() {
  const {
    createContract,
    blueprints,
    company,
  } = useStore();

  const router = useRouter();

  const [blueprintId, setBlueprintId] =
    useState("");
  const [clientName, setClient] =
    useState("");

  const today = new Date().toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const selectedBlueprint =
    blueprints.find(
      (b) => b.id === blueprintId
    );

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!blueprintId) {
      toast.error(
        "Please select a template"
      );
      return;
    }
if (!selectedBlueprint) {
  toast.error("Please select a blueprint");
  return;
}

createContract({
  blueprintId,
  blueprintName: selectedBlueprint.name, // now guaranteed string
  clientName,
  companyName: company.name,
  date,
});

  
    toast.success(
      "Contract created successfully"
    );
    router.push("/");
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-slate-500 mb-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl font-semibold tracking-tight">
            Create Contract
          </h1>
          <p className="text-sm text-slate-500">
            Generate a contract from
            your templates
          </p>
        </div>

        <button
          form="create-form"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
        >
          Save Contract
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT – DETAILS */}
        <form
          id="create-form"
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-6 shadow-sm space-y-5"
        >
          <h3 className="font-semibold text-lg">
            Contract Details
          </h3>

          <div>
            <label className="text-sm font-medium">
              Template
            </label>

            <select
              required
              value={blueprintId}
              onChange={(e) =>
                setBlueprintId(
                  e.target.value
                )
              }
              className="w-full border px-4 py-2 rounded-md mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">
                Select blueprint
              </option>

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

          <div>
            <label className="text-sm font-medium">
              Client Name
            </label>

            <input
              required
              value={clientName}
              onChange={(e) =>
                setClient(
                  e.target.value
                )
              }
              placeholder="Acme Corporation"
              className="w-full border px-4 py-2 rounded-md mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
          >
            Create Contract
          </button>
        </form>

        {/* RIGHT – LIVE PREVIEW */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-center">
            {selectedBlueprint?.name ||
              "Contract Title"}
          </h3>

          <p className="text-sm text-slate-500 text-center">
            Client:{" "}
            {clientName ||
              "Client Name"}
          </p>

          <p className="text-xs text-slate-400 text-center mb-6">
            Date: {today}
          </p>

          <div className="space-y-4 text-sm leading-relaxed">

            <p>
              This agreement is entered
              on <b>{today}</b>{" "}
              between{" "}
              <b>
                {clientName ||
                  "Client"}
              </b>{" "}
              and{" "}
              <b>
                {company.name}
              </b>
              .
            </p>

            {selectedBlueprint?.sections.map(
              (s, i) => (
                <div
                  key={s.id}
                  className="slide-up"
                >
                  <p className="font-medium">
                    {i + 1}.{" "}
                    {s.title}
                  </p>
                  <p className="text-slate-600">
                    {s.content}
                  </p>
                </div>
              )
            )}

            <div className="border-t pt-4 mt-6">
              <p>
                Signature:
                ___________________
              </p>
              <p className="mt-2">
                Authorized by{" "}
                {company.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
