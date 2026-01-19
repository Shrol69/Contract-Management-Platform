"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft } from "lucide-react";

const steps = [
  "CREATED",
  "APPROVED",
  "SENT",
  "SIGNED",
  "LOCKED",
];

export default function ContractDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { contracts, updateStatus, revokeContract } =
    useStore();

  const contract = contracts.find(
    (c) => c.id === id
  );

  if (!contract)
    return (
      <div className="p-6">
        Contract not found
      </div>
    );

  const currentStep =
    steps.indexOf(contract.status);

  return (
    <div className="max-w-4xl mx-auto">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 mb-4 hover:text-black"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="bg-white border rounded-xl p-6 shadow-sm">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold">
              {contract.blueprintName}
            </h1>
            <p className="text-slate-500">
              Client: {contract.clientName}
            </p>
          </div>

          <StatusBadge status={contract.status} />
        </div>

        {/* Stepper */}
        <div className="flex justify-between mb-10">
          {steps.map((s, i) => (
            <div
              key={s}
              className="flex-1 flex items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                ${
                  i <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {i + 1}
              </div>

              {i !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2
                  ${
                    i < currentStep
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t pt-6">

          {contract.status === "CREATED" && (
            <button
              onClick={() =>
                updateStatus(
                  contract.id,
                  "APPROVED"
                )
              }
              className="btn-primary"
            >
              Approve
            </button>
          )}

         {contract.status === "APPROVED" && (
  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between items-center">

    <div>
      <p className="font-medium">
        Ready to send contract
      </p>
      <p className="text-sm text-slate-500">
        This will notify the client via email
      </p>
    </div>

    <button
      onClick={() =>
        updateStatus(contract.id, "SENT")
      }
      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
    >
      Send Contract
    </button>
  </div>
)}

          {contract.status === "SENT" && (
            <button
              onClick={() =>
                updateStatus(
                  contract.id,
                  "SIGNED"
                )
              }
              className="btn-primary"
            >
              Mark Signed
            </button>
          )}

          {contract.status === "SIGNED" && (
            <button
              onClick={() =>
                updateStatus(
                  contract.id,
                  "LOCKED"
                )
              }
              className="btn-primary"
            >
              Lock
            </button>
          )}

          {/* Revoke */}
          {contract.status !==
            "LOCKED" && (
            <button
              onClick={() =>
                revokeContract(
                  contract.id
                )
              }
              className="ml-auto text-red-600 border border-red-200 px-4 py-2 rounded-md text-sm hover:bg-red-50"
            >
              Revoke
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
