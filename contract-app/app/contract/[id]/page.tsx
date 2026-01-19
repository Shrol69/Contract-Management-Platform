"use client";

import { useStore } from "@/store/useStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft } from "lucide-react";

const STEPS = ["CREATED", "APPROVED", "SENT", "SIGNED", "LOCKED"];

export default function ContractDetails() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";

  const { contracts, updateStatus, revokeContract } = useStore();
  const [contract, setContract] = useState(
    contracts.find((c) => c.id === id)
  );

  useEffect(() => {
    if (id) {
      setContract(contracts.find((c) => c.id === id));
    }
  }, [id, contracts]);

  if (!contract) return <div className="p-10">Loading...</div>;

  const currentStep = STEPS.indexOf(contract.status);

  return (
    <div className="max-w-4xl mx-auto fade-in">

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-black mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="card">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {contract.blueprintName}
            </h1>
            <p className="text-slate-600">
              Client: {contract.clientName}
            </p>
          </div>

          <StatusBadge status={contract.status} />
        </div>

        {/* STATUS STEPPER */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className="flex-1 flex items-center"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold
                ${
                  i <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {i + 1}
              </div>

              {i !== STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2
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

        {/* ACTIONS */}
        <div className="flex gap-3 pt-6 border-t">

          {contract.status === "CREATED" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "APPROVED")
              }
              className="btn-primary"
            >
              Approve
            </button>
          )}

          {contract.status === "APPROVED" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "SENT")
              }
              className="btn-primary"
            >
              Send
            </button>
          )}

          {contract.status === "SENT" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "SIGNED")
              }
              className="btn-primary"
            >
              Mark Signed
            </button>
          )}

          {contract.status === "SIGNED" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "LOCKED")
              }
              className="btn-primary"
            >
              Lock Contract
            </button>
          )}

          {/* REVOKE */}
          {contract.status !== "LOCKED" &&
            contract.status !== "REVOKED" && (
              <button
                onClick={() =>
                  revokeContract(contract.id)
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
