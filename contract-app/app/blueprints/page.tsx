"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Blueprints() {
  const {
    blueprints,
    createBlueprint,
    addSection,
    updateSection,
    deleteBlueprint, // 👈 NEW
  } = useStore();

  const router = useRouter();

  const [name, setName] = useState("");
  const [activeId, setActiveId] =
    useState<string | null>(null);

  const active = blueprints.find(
    (b) => b.id === activeId
  );

  function handleCreate() {
    if (!name.trim()) return;
    createBlueprint(name);
    toast.success("Blueprint created");
    setName("");
  }

  function handleDelete(id: string) {
    if (
      !confirm(
        "Are you sure? This blueprint will be permanently deleted."
      )
    )
      return;

    deleteBlueprint(id);

    if (activeId === id) {
      setActiveId(null);
    }

    toast.success("Blueprint deleted");
  }

  function exportPDF() {
    if (!active) return;

    const pdf = new jsPDF("p", "mm", "a4");
    let y = 20;

    pdf.setFontSize(16);
    pdf.text(active.name, 105, y, {
      align: "center",
    });

    y += 12;

    active.sections.forEach((s, i) => {
      pdf.setFontSize(12);
      pdf.text(
        `${i + 1}. ${s.title}`,
        10,
        y
      );
      y += 8;

      pdf.setFontSize(10);
      pdf.text(
        s.content,
        10,
        y,
        { maxWidth: 190 }
      );
      y += 18;
    });

    pdf.save(
      `${active.name.replace(
        /\s/g,
        "_"
      )}.pdf`
    );
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
            Create Blueprint
          </h1>
          <p className="text-sm text-slate-500">
            Design a reusable contract template
          </p>
        </div>

        <button
          onClick={exportPDF}
          disabled={!active}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
        >
          Save Blueprint
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">

          <h3 className="font-semibold text-lg">
            Details
          </h3>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="e.g. Employment Agreement"
            className="border w-full px-4 py-2 rounded-md text-sm"
          />

          <button
            onClick={handleCreate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
          >
            Create Blueprint
          </button>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">
              Existing Blueprints
            </p>

            {blueprints.length === 0 && (
              <p className="text-sm text-slate-400">
                No blueprints yet
              </p>
            )}

            <div className="space-y-2">
              {blueprints.map((b) => (
                <div
                  key={b.id}
                  className={`p-2 rounded text-sm cursor-pointer transition flex justify-between items-center
                  ${
                    activeId === b.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-slate-100"
                  }`}
                >
                  <span
                    onClick={() =>
                      setActiveId(b.id)
                    }
                  >
                    {b.name}
                  </span>

                  <button
                    onClick={() =>
                      handleDelete(b.id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-lg">
                Field Layout
              </h3>
              <p className="text-sm text-slate-500">
                Add legal sections
              </p>
            </div>

            <button
              onClick={() =>
                active &&
                addSection(active.id)
              }
              disabled={!active}
              className="flex items-center gap-2 text-sm border px-3 py-2 rounded-md hover:bg-slate-50"
            >
              <Plus size={16} />
              Add Field
            </button>
          </div>

          {!active ? (
            <div className="text-center text-slate-400 text-sm py-20 border rounded-lg">
              Select a blueprint to start editing
            </div>
          ) : (
            <div className="space-y-4">
              {active.sections.map(
                (s, i) => (
                  <div
                    key={s.id}
                    className="border rounded-lg p-4"
                  >
                    <input
                      value={s.title}
                      onChange={(e) =>
                        updateSection(
                          active.id,
                          s.id,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder={`Section ${
                        i + 1
                      } title`}
                      className="border w-full px-3 py-2 rounded text-sm font-medium mb-2"
                    />

                    <textarea
                      value={s.content}
                      onChange={(e) =>
                        updateSection(
                          active.id,
                          s.id,
                          "content",
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder="Legal content..."
                      className="border w-full px-3 py-2 rounded text-sm"
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
