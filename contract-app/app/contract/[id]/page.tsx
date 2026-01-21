"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { StatusBadge } from "@/components/StatusBadge";
import {
  ArrowLeft,
  Download,
  CheckCircle,
  Send,
  Pen,
  Lock,
} from "lucide-react";
import jsPDF from "jspdf";
import { useState } from "react";

/* STEPS */
const steps = [
  { label: "Created", icon: <Pen size={18} /> },
  { label: "Approved", icon: <CheckCircle size={18} /> },
  { label: "Sent", icon: <Send size={18} /> },
  { label: "Signed", icon: <Pen size={18} /> },
  { label: "Locked", icon: <Lock size={18} /> },
];

export default function ContractDetail() {
  const { id } = useParams();
  const router = useRouter();

  const { contracts, blueprints, updateStatus } =
    useStore();

  const [downloading, setDownloading] =
    useState(false);

  const contract = contracts.find(
    (c) => c.id === id
  );
if (!contract) {
  return (
    <div className="p-10 text-center text-slate-400">
      Contract not found
    </div>
  );
}
  if (!contract) return <Skeleton />;

  const blueprint = blueprints.find(
    (b) => b.id === contract.blueprintId
  );

  const statusMap = [
    "CREATED",
    "APPROVED",
    "SENT",
    "SIGNED",
    "LOCKED",
  ];

  const currentStep =
    statusMap.indexOf(contract.status);

  const today =
    new Date().toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  /* PDF */
  async function downloadPDF() {
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

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      210,
      297
    );

    pdf.save(
      `${contract.clientName}_${today}.pdf`
    );

    setDownloading(false);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 mb-3 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            {contract.blueprintName}
          </h1>

          <StatusBadge
            status={contract.status}
          />
        </div>

        <p className="text-sm text-slate-500 mt-1">
          Client:
          <span className="ml-1 font-medium">
            {contract.clientName}
          </span>
        </p>
      </div>

      {/* LIFECYCLE */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <h3 className="font-semibold text-lg">
          Contract Lifecycle
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Track contract progress
        </p>

        <div className="flex justify-between">

          {steps.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 w-full"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition
                ${
                  i <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {s.icon}
              </div>

              <p
                className={`text-sm
                ${
                  i <= currentStep
                    ? "text-blue-600 font-medium"
                    : "text-slate-400"
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LEFT INFO */}
        <div className="bg-white border rounded-xl p-6 space-y-5 shadow-sm">

          <h3 className="font-semibold text-lg">
            Contract Information
          </h3>

          <InfoRow
            label="Created"
            value={today}
          />
          <InfoRow
            label="Last updated"
            value={today}
          />
          <InfoRow
            label="Blueprint"
            value={blueprint?.name}
            blue
          />

          {/* ACTIONS */}
          <div className="border-t pt-4 space-y-3">

            {contract.status ===
              "CREATED" && (
              <PrimaryAction
                text="Approve Contract"
                color="blue"
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
              <PrimaryAction
                text="Send to Client"
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
              <PrimaryAction
                text="Mark as Signed"
                color="blue"
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
              <PrimaryAction
                text="Lock Contract"
                color="blue"
                onClick={() =>
                  updateStatus(
                    contract.id,
                    "LOCKED"
                  )
                }
              />
            )}

            <PrimaryAction
              text={
                downloading
                  ? "Generating PDF..."
                  : "Download PDF"
              }
              color="dark"
              onClick={downloadPDF}
            />
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div
          id="contract-preview"
          className="bg-white border rounded-xl p-8 text-sm shadow-sm"
        >
          <h2 className="text-center text-lg font-bold">
            {contract.companyName}
          </h2>

          <p className="text-center mb-6 text-slate-500">
            OFFICIAL AGREEMENT
          </p>

          {blueprint?.sections.map(
            (s, i) => (
              <div
                key={s.id}
                className="mb-5 slide-up"
              >
                <p className="font-semibold">
                  {i + 1}. {s.title}
                </p>
                <p className="text-slate-600">
                  {s.content}
                </p>
              </div>
            )
          )}

          <div className="border-t pt-5 mt-8">
            <p>
              Signature:
              ___________________
            </p>
            <p className="mt-2">
              Date: {today}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function InfoRow({
  label,
  value,
  blue,
}: any) {
  return (
    <div className="flex justify-between text-sm border-b pb-2">
      <p className="text-slate-500">
        {label}
      </p>
      <p
        className={
          blue
            ? "text-blue-600 font-medium"
            : "font-medium"
        }
      >
        {value}
      </p>
    </div>
  );
}

function PrimaryAction({
  text,
  onClick,
  color,
}: any) {
  const map = {
    blue:
      "bg-blue-600 hover:bg-blue-700",
    dark:
      "bg-slate-900 hover:bg-black",
  };

  return (
    <button
      onClick={onClick}
      className={`${map[color]} text-white w-full py-2 rounded-md text-sm font-medium transition`}
    >
      {text}
    </button>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-slate-200 w-1/3 rounded" />
      <div className="h-40 bg-slate-200 rounded" />
      <div className="h-64 bg-slate-200 rounded" />
    </div>
  );
}
