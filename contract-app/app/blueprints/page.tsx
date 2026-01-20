"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";

export default function Blueprints() {

  const {
    blueprints,
    createBlueprint,
    addSection,
    updateSection,
  } = useStore();

  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeBlueprint = blueprints.find(
    (b) => b.id === activeId
  );

  function handleCreate() {
    if (!name.trim()) return;
    createBlueprint(name);
    setName("");
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

        {/* LEFT - LIST */}
        <div className="bg-white border rounded-lg p-4 space-y-2">

          <p className="text-sm font-medium mb-2">
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

        {/* RIGHT - EDITOR */}
        <div className="col-span-2 bg-white border rounded-lg p-6">

          {!activeBlueprint ? (
            <div className="text-slate-400 text-sm text-center">
              Select a template to edit
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">
                  {activeBlueprint.name}
                </h2>

                <button
                  onClick={() =>
                    addSection(activeBlueprint.id)
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Add section
                </button>
              </div>

              {activeBlueprint.sections.length === 0 && (
                <p className="text-sm text-slate-400">
                  No sections yet
                </p>
              )}

              <div className="space-y-4">
                {activeBlueprint.sections.map(
                  (s, i) => (
                    <div
                      key={s.id}
                      className="border rounded-md p-3 space-y-2"
                    >
                      <input
                        value={s.title}
                        onChange={(e) =>
                          updateSection(
                            activeBlueprint.id,
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
                            activeBlueprint.id,
                            s.id,
                            "content",
                            e.target.value
                          )
                        }
                        rows={4}
                        placeholder="Write section content..."
                        className="border w-full px-3 py-2 rounded text-sm"
                      />
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
