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
    setContract(contracts.find((c) => c.id === id));
  }, [contracts, id]);

  if (!contract) return <div className="p-10">Loading...</div>;

  const currentStep = STEPS.indexOf(contract.status);

  return (
    <div className="max-w-5xl mx-auto">

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-black mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </button>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow-sm border p-8">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold">
              {contract.blueprintName}
            </h1>
            <p className="text-slate-500 mt-1">
              Client: {contract.clientName}
            </p>
          </div>

          <StatusBadge status={contract.status} />
        </div>

        {/* STEPPER */}
        <div className="flex items-center justify-between mb-10">

          {STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={step} className="flex-1 flex items-center">

                {/* Circle */}
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold
                  ${
                    isDone
                      ? "bg-blue-600 text-white"
                      : isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Line */}
                {index !== STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-3 rounded
                    ${
                      isDone
                        ? "bg-blue-600"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-6 border-t">

          {contract.status === "CREATED" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "APPROVED")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              Approve
            </button>
          )}

          {contract.status === "APPROVED" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "SENT")
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              Send
            </button>
          )}

          {contract.status === "SENT" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "SIGNED")
              }
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              Mark Signed
            </button>
          )}

          {contract.status === "SIGNED" && (
            <button
              onClick={() =>
                updateStatus(contract.id, "LOCKED")
              }
              className="bg-slate-800 hover:bg-black text-white px-5 py-2 rounded-md text-sm font-medium"
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
                className="ml-auto text-red-600 border border-red-200 px-5 py-2 rounded-md text-sm hover:bg-red-50"
              >
                Revoke
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
