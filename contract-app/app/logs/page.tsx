"use client";

import { useStore } from "@/store/useStore";
import { format } from "date-fns";

export default function Logs() {
  const logs = useStore((s) => s.logs);

  return (
    <div className="max-w-4xl mx-auto space-y-4">

      <div>
        <h1 className="text-2xl font-semibold">
          Audit Logs
        </h1>
        <p className="text-sm text-slate-500">
          Track all contract activities
        </p>
      </div>

      <div className="bg-white border rounded-lg divide-y">

        {logs.length === 0 && (
          <p className="p-6 text-sm text-slate-400 text-center">
            No activity recorded yet
          </p>
        )}

        {logs.map((l) => (
          <div
            key={l.id}
            className="p-4 flex justify-between"
          >
            <div>
              <p className="text-sm font-medium">
                {l.action}
              </p>
              <p className="text-xs text-slate-500">
                Contract ID: {l.contractId}
              </p>
            </div>

            <p className="text-xs text-slate-400">
              {format(
                new Date(l.time),
                "dd MMM yyyy, hh:mm a"
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
