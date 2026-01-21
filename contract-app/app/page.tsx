"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { BiBook } from "react-icons/bi";

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  const contracts = useStore((s) => s.contracts);
  const blueprints = useStore((s) => s.blueprints);

  const active = contracts.filter(
    (c) =>
      c.status === "CREATED" ||
      c.status === "APPROVED"
  ).length;

  const pending = contracts.filter(
    (c) => c.status === "SENT"
  ).length;

  const completed = contracts.filter(
    (c) => c.status === "SIGNED" ||
      c.status === "LOCKED"
  ).length;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your contracts and blueprints
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/blueprints"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center gap-2"
          >
            <BiBook size={16} />
            New Blueprint
          </Link>

          <Link
            href="/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} />
            New Contract
          </Link>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Kpi
          title="Total Blueprints"
          value={blueprints.length}
          desc="Reusable templates"
        />
        <Kpi
          title="Active"
          value={active}
          desc="Created & Approved"
        />
        <Kpi
          title="Pending"
          value={pending}
          desc="Awaiting signature"
        />
        <Kpi
          title="Completed"
          value={completed}
          desc="Signed & Locked"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* RECENT CONTRACTS */}
        <Card
          title="Recent Contracts"
          subtitle="Latest contract activity"
          link="/"
        >
          {contracts.length === 0 ? (
            <Empty
              icon={<FileText />}
              text="No contracts yet"
              action={{
                label: "Create your first contract",
                href: "/create",
              }}
            />
          ) : (
            <ul className="space-y-3">
              {contracts.slice(0, 5).map((c) => (
                <li
                  key={c.id}
                  className="flex justify-between items-center border rounded-md p-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {c.blueprintName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {c.clientName}
                    </p>
                  </div>

                  <Link
                    href={`/contract/${c.id}`}
                    className="text-blue-600 text-sm"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* BLUEPRINTS */}
        <Card
          title="Blueprints"
          subtitle="Your contract templates"
          link="/blueprints"
        >
          {blueprints.length === 0 ? (
            <Empty
              icon={<FileText />}
              text="No blueprints yet"
              action={{
                label: "Create your first blueprint",
                href: "/blueprints",
              }}
            />
          ) : (
            <ul className="space-y-3">
              {blueprints.slice(0, 5).map((b) => (
                <li
                  key={b.id}
                  className="flex justify-between items-center border rounded-md p-3 hover:bg-slate-50"
                >
                  <p className="text-sm font-medium">
                    {b.name}
                  </p>

                  <Link
                    href="/blueprints"
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Kpi({
  title,
  value,
  desc,
}: {
  title: string;
  value: number;
  desc: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm font-medium">
        {title}
      </p>
      <p className="text-3xl font-semibold mt-1">
        {value}
      </p>
      <p className="text-xs text-slate-500 mt-1">
        {desc}
      </p>
    </div>
  );
}

function Card({
  title,
  subtitle,
  link,
  children,
}: {
  title: string;
  subtitle: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold">
            {title}
          </h3>
          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <Link
          href={link}
          className="text-sm text-blue-600"
        >
          View All →
        </Link>
      </div>

      {children}
    </div>
  );
}

function Empty({
  icon,
  text,
  action,
}: {
  icon: React.ReactNode;
  text: string;
  action: {
    label: string;
    href: string;
  };
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-3">
      <div className="text-slate-300">
        {icon}
      </div>

      <p className="text-slate-500 text-sm">
        {text}
      </p>

      <Link
        href={action.href}
        className="text-blue-600 text-sm font-medium"
      >
        {action.label}
      </Link>
    </div>
  );
}
