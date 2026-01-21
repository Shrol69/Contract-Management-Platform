"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import {
  FileText,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { BiBook } from "react-icons/bi";
import { useEffect, useState } from "react";

/* CHARTS */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

/* ================= HELPERS ================= */

function useCountUp(target: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 25));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 20);

    return () => clearInterval(interval);
  }, [target]);

  return count;
}

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
    (c) =>
      c.status === "SIGNED" ||
      c.status === "LOCKED"
  ).length;

  /* MONTHLY TREND */
  const currentMonth = new Date().getMonth();

  const thisMonth = contracts.filter(
    (c) =>
      new Date(c.createdAt).getMonth() ===
      currentMonth
  ).length;

  const lastMonth = contracts.filter(
    (c) =>
      new Date(c.createdAt).getMonth() ===
      currentMonth - 1
  ).length;

  const trend = thisMonth - lastMonth;

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
          percent={trend}
          progress={100}
        />

        <Kpi
          title="Active"
          value={active}
          desc="Created & Approved"
          percent={5}
          progress={
            (active / contracts.length) * 100 ||
            0
          }
        />

        <Kpi
          title="Pending"
          value={pending}
          desc="Awaiting signature"
          percent={-3}
          progress={
            (pending / contracts.length) * 100 ||
            0
          }
        />

        <Kpi
          title="Completed"
          value={completed}
          desc="Signed & Locked"
          percent={12}
          progress={
            (completed / contracts.length) *
              100 || 0
          }
        />

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold mb-4">
            Contract Distribution
          </h3>

          <StatusPie
            active={active}
            pending={pending}
            completed={completed}
          />
        </div>

        {/* BAR */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold mb-4">
            Monthly Activity
          </h3>

          <MonthlyBar contracts={contracts} />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* RECENT CONTRACTS */}
        <Card
          title="Recent Contracts"
          subtitle="Latest contract activity"
          link="/contract"
        >
          {contracts.length === 0 ? (
            <Empty
              icon={<FileText />}
              text="No contracts yet"
              action={{
                label:
                  "Create your first contract",
                href: "/create",
              }}
            />
          ) : (
            <ul className="space-y-3">
              {contracts
                .slice(0, 5)
                .map((c) => (
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
                label:
                  "Create your first blueprint",
                href: "/blueprints",
              }}
            />
          ) : (
            <ul className="space-y-3">
              {blueprints
                .slice(0, 5)
                .map((b) => (
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
  percent,
  progress,
}: any) {
  const animated = useCountUp(value);

  return (
    <div className="bg-white border rounded-xl p-5 space-y-2">

      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">
          {title}
        </p>

        {percent !== undefined && (
          <span
            className={`text-xs flex items-center gap-1
            ${
              percent >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {percent >= 0 ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            {Math.abs(percent)}%
          </span>
        )}
      </div>

      <p className="text-3xl font-semibold">
        {animated}
      </p>

      <p className="text-xs text-slate-500">
        {desc}
      </p>

      {progress !== undefined && (
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* PIE */

function StatusPie({
  active,
  pending,
  completed,
}: any) {
  const data = [
    { name: "Active", value: active },
    { name: "Pending", value: pending },
    { name: "Completed", value: completed },
  ];

  const colors = [
    "#3b82f6",
    "#f59e0b",
    "#22c55e",
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            label
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={colors[i]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* BAR */

function MonthlyBar({
  contracts,
}: any) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const data = months.map((m, i) => ({
    name: m,
    value: contracts.filter(
      (c: any) =>
        new Date(c.createdAt)
          .getMonth() === i
    ).length,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#3b82f6"
            radius={[6,6,0,0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* CARD */

function Card({
  title,
  subtitle,
  link,
  children,
}: any) {
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

/* EMPTY */

function Empty({
  icon,
  text,
  action,
}: any) {
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
