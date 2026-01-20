"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useMemo, useState } from "react";

export default function Dashboard() {

  const contracts = useStore(
    (s) => s.contracts
  ) || [];

  const [search, setSearch] = useState("");

  // SEARCH FILTER
  const filtered = useMemo(() => {
    return contracts.filter((c) =>
      c.blueprintName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      c.clientName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, contracts]);

  // STATS
  const total = contracts.length;
  const signed = contracts.filter(
    (c) => c.status === "SIGNED"
  ).length;
  const pending = total - signed;

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Contracts
          </h1>
          <p className="text-sm text-slate-500">
            Manage all your legal documents
          </p>
        </div>

        <Link
          href="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition"
        >
          <Plus size={16} />
          New Contract
        </Link>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <Stat title="Total" value={total} />
        <Stat title="Pending" value={pending} />
        <Stat title="Signed" value={signed} />

      </div>

      {/* SEARCH */}
      <div className="relative w-72 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search contracts..."
          className="w-full pl-10 pr-4 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">

        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <Th>Contract</Th>
              <Th>Client</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <th />
            </tr>
          </thead>

          <tbody className="divide-y">

            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center"
                >
                  <p className="text-slate-400">
                    No contracts found
                  </p>

                  <Link
                    href="/create"
                    className="text-blue-600 text-sm mt-2 inline-block"
                  >
                    Create your first contract
                  </Link>
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {c.blueprintName}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {c.clientName}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={c.status}
                    />
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {format(
                      new Date(c.createdAt),
                      "dd MMM yyyy"
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/contract/${c.id}`}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}

/* SMALL REUSABLE COMPONENTS */

function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-sm text-slate-500">
        {title}
      </p>
      <p className="text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function Th({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
      {children}
    </th>
  );
}
