"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!blueprintId) {
      toast.error("Select template");
      return;
    }

    createContract({
      blueprintId,
      blueprintName:
        selectedBlueprint?.name,
      clientName,
      companyName: company.name,
      date: today,
    });

    toast.success("Contract created");
    router.push("/");
  }

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Create Contract
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-5"
      >
        <select
          required
          value={blueprintId}
          onChange={(e) =>
            setBlueprintId(
              e.target.value
            )
          }
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">
            Select template
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

        <input
          required
          value={clientName}
          onChange={(e) =>
            setClient(e.target.value)
          }
          placeholder="Client name"
          className="w-full border px-4 py-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Create
        </button>
      </form>

      {/* PREVIEW */}
      <div className="mt-8 bg-white border p-6 rounded">

        <h3 className="text-center font-semibold">
          {selectedBlueprint?.name ||
            "Contract"}
        </h3>

        <p className="text-center text-sm text-slate-500">
          {clientName || "Client"} |{" "}
          {today}
        </p>

        <p className="mt-4 text-sm">
          Agreement between{" "}
          <b>{clientName}</b> and{" "}
          <b>{company.name}</b>
        </p>
      </div>
    </div>
  );
}
