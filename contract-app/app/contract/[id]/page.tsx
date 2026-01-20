"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";
import { useState } from "react";

/* TYPES */

type ActionColor =
  | "green"
  | "blue"
  | "purple"
  | "slate";

type ActionCardProps = {
  title: string;
  desc: string;
  btn: string;
  color: ActionColor;
  onClick: () => void;
};

/* CONSTANTS */

const steps = [
  "CREATED",
  "APPROVED",
  "SENT",
  "SIGNED",
  "LOCKED",
] as const;

export default function ContractDetail() {
  const { id } = useParams();
  const router = useRouter();

  const {
    contracts,
    blueprints,
    updateStatus,
  } = useStore();

  const [downloading, setDownloading] =
    useState(false);

  const contract = contracts.find(
    (c) => c.id === id
  );

  if (!contract) {
    return (
      <div className="p-6">
        Contract not found
      </div>
    );
  }

  const blueprint = blueprints.find(
    (b) => b.id === contract.blueprintId
  );

  const currentStep =
    steps.indexOf(contract.status);

  const today = new Date().toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  /* DOWNLOAD PDF */
  async function downloadPDF() {
    if (typeof window === "undefined") return;

    setDownloading(true);

    const node =
      document.getElementById(
        "contract-preview"
      );

    if (!node) return;

    const domtoimage =
      (await import(
        "dom-to-image-more"
      )).default;

    const dataUrl =
      await domtoimage.toPng(node);

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

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

    const safeName =
      contract.blueprintName
        .replace(/\s+/g, "_")
        .toLowerCase();

    pdf.save(
      `eurusys_${safeClient}_${safeName}_${today.replace(
        / /g,
        "_"
      )}.pdf`
    );

    setDownloading(false);
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 mb-4 hover:text-black"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT PANEL */}
        <div className="md:col-span-2 bg-white border rounded-xl p-6">

          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-semibold">
                {contract.blueprintName}
              </h1>
              <p className="text-slate-500">
                Client:
                <span className="font-medium ml-1">
                  {contract.clientName}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge
                status={contract.status}
              />
              <Link
  href={`/contract/${contract.id}/edit`}
  className="bg-slate-200 px-3 py-2 rounded-md text-sm"
>
  Edit
</Link>


              <button
                onClick={downloadPDF}
                disabled={downloading}
                className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-md text-sm disabled:opacity-50"
              >
                <Download size={16} />
                {downloading
                  ? "Generating..."
                  : "Download PDF"}
              </button>
            </div>
          </div>

          {/* STEPPER */}
          <div className="flex justify-between mb-10">
            {steps.map((_, i) => (
              <div
                key={i}
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

            {contract.status ===
              "CREATED" && (
              <ActionCard
                title="Approve contract"
                desc="Review and approve"
                btn="Approve"
                color="green"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "APPROVED"
                  )
                }
              />
            )}

            {contract.status ===
              "APPROVED" && (
              <ActionCard
                title="Send to client"
                desc="Email simulation"
                btn="Send"
                color="blue"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "SENT"
                  )
                }
              />
            )}

            {contract.status ===
              "SENT" && (
              <ActionCard
                title="Await signature"
                desc="Mark when signed"
                btn="Signed"
                color="purple"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "SIGNED"
                  )
                }
              />
            )}

            {contract.status ===
              "SIGNED" && (
              <ActionCard
                title="Lock contract"
                desc="Prevent changes"
                btn="Lock"
                color="slate"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "LOCKED"
                  )
                }
              />
            )}
          </div>
        </div>

        {/* PREVIEW */}
        <div
          id="contract-preview"
          className="bg-white border rounded-lg p-8 h-fit text-sm"
        >
          <h2 className="text-center text-lg font-bold">
            {contract.companyName ||
              "EURUSYS LLC"}
          </h2>

          <p className="text-center mb-6">
            OFFICIAL AGREEMENT
          </p>

          <p className="mb-4">
            Client:
            <b className="ml-1">
              {contract.clientName}
            </b>
            <br />
            Date:
            <b className="ml-1">
              {today}
            </b>
          </p>

          {/* TEMPLATE SECTIONS */}
          {blueprint?.sections.map(
            (s, i) => (
              <div
                key={s.id}
                className="mb-5"
              >
                <h3 className="font-semibold">
                  {i + 1}. {s.title}
                </h3>
                <p>{s.content}</p>
              </div>
            )
          )}

          <div className="border-t pt-6 mt-8">
            <p>
              Signature:
              ___________________
            </p>
            <p className="mt-2">
              Date:
              <b className="ml-1">
                {today}
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ACTION CARD */

function ActionCard({
  title,
  desc,
  btn,
  onClick,
  color,
}: ActionCardProps) {
  const map: Record<ActionColor, string> = {
    green:
      "bg-green-50 border-green-200 text-green-700",
    blue:
      "bg-blue-50 border-blue-200 text-blue-700",
    purple:
      "bg-purple-50 border-purple-200 text-purple-700",
    slate:
      "bg-slate-50 border-slate-200 text-slate-700",
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
        className="bg-black text-white px-4 py-2 rounded-md text-sm"
      >
        {btn}
      </button>
    </div>
  );
}
