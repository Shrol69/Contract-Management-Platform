"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateContract() {
  const {
    createContract,
    blueprints,
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
        "Please select a blueprint"
      );
      return;
    }

    try {
      createContract({
        blueprintId,
        blueprintName:
          selectedBlueprint?.name,
        clientName,
        companyName:
          "Eurusys Technologies LLC",
        date: today,
      });

      toast.success(
        "Contract created successfully"
      );
      router.push("/");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Create New Contract
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-5"
      >
        {/* BLUEPRINT */}
        <div>
          <label className="text-sm font-medium">
            Select Template
          </label>

          <select
            required
            value={blueprintId}
            onChange={(e) =>
              setBlueprintId(
                e.target.value
              )
            }
            className="w-full border rounded-md px-4 py-2 mt-1 text-sm"
          >
            <option value="">
              Choose blueprint
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

        {/* CLIENT */}
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
            placeholder="Acme Corporation"
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

      {/* PREVIEW */}
      <div className="mt-10">
        <h2 className="font-medium mb-3">
          Live Preview
        </h2>

        <div className="bg-white border rounded-lg p-6">

          <h3 className="text-lg font-semibold text-center">
            {selectedBlueprint?.name ||
              "Contract Title"}
          </h3>

          <p className="text-sm text-slate-500 text-center">
            Client:
            {clientName || "Client Name"}
          </p>

          <p className="text-xs text-slate-400 text-center mb-5">
            Date: {today}
          </p>

          <div className="space-y-3 text-sm leading-relaxed">

            <p>
              This agreement is entered on{" "}
              <b>{today}</b> between{" "}
              <b>
                {clientName || "Client"}
              </b>{" "}
              and{" "}
              <b>
                Eurusys Technologies LLC
              </b>
              .
            </p>

            {/* DYNAMIC SECTIONS */}
            {selectedBlueprint?.sections.map(
              (s, i) => (
                <div key={s.id}>
                  <p className="font-medium">
                    {i + 1}. {s.title}
                  </p>
                  <p>{s.content}</p>
                </div>
              )
            )}

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
