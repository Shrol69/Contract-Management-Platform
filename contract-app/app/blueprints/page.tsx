"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

export default function Blueprints() {
  const {
    blueprints,
    createBlueprint,
    addSection,
    updateSection,
  } = useStore();

  const [name, setName] = useState("");
  const [activeId, setActiveId] =
    useState<string | null>(null);

  const active = blueprints.find(
    (b) => b.id === activeId
  );

  function handleCreate() {
    if (!name.trim()) return;
    createBlueprint(name);
    toast.success("Template created");
    setName("");
  }

  /* EXPORT PDF */
  function exportPDF() {
    if (!active) return;

    const pdf = new jsPDF("p", "mm", "a4");

    let y = 20;
    pdf.setFontSize(16);
    pdf.text(active.name, 105, y, {
      align: "center",
    });

    y += 15;

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
      y += 20;
    });

    pdf.save(
      `${active.name.replace(
        /\s/g,
        "_"
      )}.pdf`
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Contract Templates
        </h1>
        <p className="text-sm text-slate-500">
          Create reusable legal templates
        </p>
      </div>

      {/* CREATE */}
      <div className="flex gap-3">
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Template name"
          className="border px-4 py-2 rounded-md w-64"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-md text-sm"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="bg-white border rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium">
            Templates
          </p>

          {blueprints.length === 0 && (
            <p className="text-sm text-slate-400">
              No templates yet
            </p>
          )}

          {blueprints.map((b) => (
            <div
              key={b.id}
              onClick={() =>
                setActiveId(b.id)
              }
              className={`p-2 rounded cursor-pointer text-sm
              ${
                activeId === b.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "hover:bg-slate-100"
              }`}
            >
              {b.name}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-span-2 bg-white border rounded-lg p-6">

          {!active ? (
            <div className="text-slate-400 text-sm text-center">
              Select a template to edit
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">
                  {active.name}
                </h2>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      addSection(active.id)
                    }
                    className="text-sm text-blue-600"
                  >
                    + Add section
                  </button>

                  <button
                    onClick={exportPDF}
                    className="text-sm bg-black text-white px-3 py-1 rounded"
                  >
                    Export PDF
                  </button>
                </div>
              </div>

              {active.sections.length === 0 && (
                <p className="text-sm text-slate-400">
                  No sections yet
                </p>
              )}

              <div className="space-y-4">
                {active.sections.map(
                  (s, i) => (
                    <div
                      key={s.id}
                      className="border rounded-md p-3 space-y-2"
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
                        className="border w-full px-3 py-2 rounded text-sm font-medium"
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
                        rows={4}
                        placeholder="Write legal content..."
                        className="border w-full px-3 py-2 rounded text-sm"
                      />
                    </div>
                  )
                )}
              </div>

              {/* PREVIEW */}
              <div className="mt-8 border-t pt-6">
                <p className="font-medium mb-3">
                  Preview
                </p>

                <div className="space-y-4 text-sm leading-relaxed">
                  {active.sections.map(
                    (s, i) => (
                      <div key={s.id}>
                        <p className="font-semibold">
                          {i + 1}.{" "}
                          {s.title}
                        </p>
                        <p className="text-slate-600">
                          {s.content}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
