"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { nanoid } from "nanoid";

const FIELD_TYPES = [
  { type: "text", label: "Text" },
  { type: "date", label: "Date" },
  { type: "signature", label: "Signature" },
  { type: "checkbox", label: "Checkbox" },
];

export default function Blueprints() {
  const {
    blueprints,
    createBlueprint,
    addField,
  } = useStore();

  const [name, setName] = useState("");
  const [activeId, setActiveId] =
    useState<string | null>(null);

  function handleCreate() {
    if (!name) return;
    createBlueprint(name);
    setName("");
  }

  function handleDrop(e: any) {
    e.preventDefault();

    const type =
      e.dataTransfer.getData("type");

    if (!type || !activeId) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    addField(activeId, {
      id: nanoid(),
      type,
      label: type.toUpperCase(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Blueprint Builder
      </h1>

      {/* CREATE */}
      <div className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Blueprint name"
          className="border px-4 py-2 rounded-md"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">

        {/* TOOLBOX */}
        <div className="space-y-3">
          <p className="font-medium">
            Fields
          </p>

          {FIELD_TYPES.map((f) => (
            <div
              key={f.type}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData(
                  "type",
                  f.type
                )
              }
              className="border px-3 py-2 rounded-md cursor-grab bg-white"
            >
              {f.label}
            </div>
          ))}
        </div>

        {/* CANVAS */}
        <div className="col-span-3 space-y-6">

          {blueprints.map((b) => (
            <div key={b.id}>
              <h2
                onClick={() =>
                  setActiveId(b.id)
                }
                className={`font-medium mb-2 cursor-pointer ${
                  activeId === b.id
                    ? "text-blue-600"
                    : ""
                }`}
              >
                {b.name}
              </h2>

              <div
                onDragOver={(e) =>
                  e.preventDefault()
                }
                onDrop={handleDrop}
                className="relative h-96 border rounded-lg bg-slate-50"
              >
                {b.fields.map((f) => (
                  <div
                    key={f.id}
                    style={{
                      left: f.x,
                      top: f.y,
                    }}
                    className="absolute border bg-white px-2 py-1 text-xs rounded shadow"
                  >
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
