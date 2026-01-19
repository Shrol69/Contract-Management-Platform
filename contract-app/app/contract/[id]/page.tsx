"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";


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

async function downloadPDF() {
  if (typeof window === "undefined") return;

  const node = document.getElementById(
    "contract-preview"
  );
  if (!node) return;

  // dynamic import (client only)
  const domtoimage =
    (await import("dom-to-image-more")).default;

  const dataUrl = await domtoimage.toPng(node);

  const pdf = new jsPDF("p", "mm", "a4");

  const imgProps =
    pdf.getImageProperties(dataUrl);

  const pdfWidth = 210;
  const pdfHeight =
    (imgProps.height * pdfWidth) /
    imgProps.width;

  pdf.addImage(
    dataUrl,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  const safeClient =
    contract.clientName
      .replace(/\s+/g, "_")
      .toLowerCase();

  const safeContract =
    contract.blueprintName
      .replace(/\s+/g, "_")
      .toLowerCase();

  pdf.save(
    `${safeClient}_${safeContract}.pdf`
  );
}


  return (
    <div className="max-w-5xl mx-auto">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 mb-4 hover:text-black"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT PANEL */}
        <div className="md:col-span-2 bg-white border rounded-xl p-6 shadow-sm">

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

            <div className="flex items-center gap-3">
              <StatusBadge
                status={contract.status}
              />

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-md text-sm hover:opacity-90"
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>
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

          {/* ACTIONS */}
          <div className="border-t pt-6 space-y-4">

            {contract.status === "CREATED" && (
              <ActionCard
                title="Approve contract"
                desc="Review and approve this contract"
                color="green"
                btn="Approve"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "APPROVED"
                  )
                }
              />
            )}

            {contract.status === "APPROVED" && (
              <ActionCard
                title="Ready to send"
                desc="Client will receive email"
                color="blue"
                btn="Send Contract"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "SENT"
                  )
                }
              />
            )}

            {contract.status === "SENT" && (
              <ActionCard
                title="Awaiting signature"
                desc="Mark once client signs"
                color="purple"
                btn="Mark Signed"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "SIGNED"
                  )
                }
              />
            )}

            {contract.status === "SIGNED" && (
              <ActionCard
                title="Finalize contract"
                desc="Lock to prevent edits"
                color="slate"
                btn="Lock Contract"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "LOCKED"
                  )
                }
              />
            )}

            {contract.status !== "LOCKED" && (
              <ActionCard
                title="Revoke contract"
                desc="This action cannot be undone"
                color="red"
                btn="Revoke"
                danger
                onClick={() =>
                  revokeContract(contract.id)
                }
              />
            )}
          </div>
        </div>

        {/* RIGHT PANEL – PREVIEW */}
        <div
  id="contract-preview"
  className="bg-white border border-slate-200 rounded-lg p-6 h-fit"
>
  <h3 className="font-semibold mb-3 print:hidden">
    Contract Preview
  </h3>

  <div className="text-sm space-y-5 leading-relaxed">

    <h2 className="text-lg font-bold text-center">
      {contract.blueprintName}
    </h2>

    <p className="text-slate-500 text-center">
      Client: {contract.clientName}
    </p>

    <p>
  This agreement is entered between{" "}
  <b>{contract.clientName}</b> and
  <b> EURUSYS LLC </b>.
</p>
    <p>
      All confidential information must remain
      protected and shall not be disclosed.
    </p>

    <p>
      This contract is legally binding under
      applicable laws.
    </p>

    <div className="border-t pt-4 mt-6">
      <p>
        Signature:
        ___________________
      </p>
      <p className="mt-2">
        Date:
        ___________________
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

/* ACTION CARD COMPONENT */
function ActionCard({
  title,
  desc,
  btn,
  onClick,
  color,
  danger,
}: any) {
  const map: any = {
    green:
      "bg-green-50 border-green-200 text-green-700",
    blue:
      "bg-blue-50 border-blue-200 text-blue-700",
    purple:
      "bg-purple-50 border-purple-200 text-purple-700",
    slate:
      "bg-slate-50 border-slate-200 text-slate-700",
    red:
      "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div
      className={`border p-4 rounded-lg flex justify-between items-center ${map[color]}`}
    >
      <div>
        <p className="font-medium">
          {title}
        </p>
        <p className="text-sm opacity-80">
          {desc}
        </p>
      </div>

      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md text-sm text-white ${
          danger
            ? "bg-red-600"
            : "bg-black"
        }`}
      >
        {btn}
      </button>
    </div>
  );
}
