"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const tabs = ["All", "Active", "Pending", "Signed"] as const;

export default function ContractsPage() {
  const contracts = useStore((s) => s.contracts);
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("All");

  const filtered = contracts.filter((c) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active")
      return ["CREATED", "APPROVED"].includes(c.status);
    if (activeTab === "Pending") return c.status === "SENT";
    if (activeTab === "Signed") return c.status === "SIGNED";
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold">
            Contracts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and manage all your contracts
          </p>
        </div>

        <Link
          href="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
        >
          <Plus size={16} />
          New Contract
        </Link>
      </div>

      {/* CARD */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">

        {/* CARD HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              All Contracts
            </h2>
            <p className="text-sm text-slate-500">
              {contracts.length} contracts
            </p>
          </div>

          {/* TABS */}
          <div className="flex gap-2 bg-slate-100 p-1 rounded-md">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-sm rounded transition
                ${
                  activeTab === tab
                    ? "bg-white shadow text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab} (
                {tab === "All"
                  ? contracts.length
                  : contracts.filter((c) => {
                      if (tab === "Active")
                        return ["CREATED", "APPROVED"].includes(c.status);
                      if (tab === "Pending") return c.status === "SENT";
                      if (tab === "Signed") return c.status === "SIGNED";
                      return false;
                    }).length}
                )
              </button>
            ))}
          </div>
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium">
              No contracts yet
            </p>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              Create your first contract to get started
            </p>

            <Link
              href="/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} />
              Create Contract
            </Link>
          </div>
        )}

        {/* LIST */}
        {filtered.length > 0 && (
          <div className="divide-y">
            {filtered.map((c) => (
              <Link
                key={c.id}
                href={`/contract/${c.id}`}
                className="flex justify-between items-center py-4 hover:bg-slate-50 px-2 rounded transition"
              >
                <div>
                  <p className="font-medium">
                    {c.blueprintName}
                  </p>
                  <p className="text-sm text-slate-500">
                    Client: {c.clientName}
                  </p>
                </div>

                <StatusBadge status={c.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
