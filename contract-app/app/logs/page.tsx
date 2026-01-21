"use client";

import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import { Activity } from "lucide-react";

export default function Logs() {
  const logs = useStore((s) => s.logs);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Audit Logs
        </h1>
        <p className="text-sm text-slate-500">
          Track every action performed on contracts
        </p>
      </div>

      {/* LOG CARD */}
      <div className="bg-white border rounded-xl shadow-sm">

        {/* EMPTY */}
        {logs.length === 0 && (
          <div className="p-10 text-center">
            <Activity
              size={36}
              className="mx-auto text-slate-300 mb-3"
            />
            <p className="text-sm text-slate-400">
              No activity recorded yet
            </p>
          </div>
        )}

        {/* LIST */}
        {logs.map((l, i) => (
          <div
            key={l.id}
            style={{
              animationDelay: `${i * 40}ms`,
            }}
            className="p-5 border-b last:border-b-0 flex items-start justify-between gap-4 slide-up"
          >
            <div className="flex gap-3">

              {/* ICON */}
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                <Activity
                  size={16}
                  className="text-blue-600"
                />
              </div>

              {/* TEXT */}
              <div>
                <p className="text-sm font-medium">
                  {l.action}
                </p>

                <p className="text-xs text-slate-500">
                  Contract ID:{" "}
                  <span className="font-mono">
                    {l.contractId}
                  </span>
                </p>
              </div>
            </div>

            {/* TIME */}
            <p className="text-xs text-slate-400 whitespace-nowrap">
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
