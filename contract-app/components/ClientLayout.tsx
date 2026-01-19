"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, User, Menu } from "lucide-react";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Blueprints", href: "/create", icon: FileText },
    { name: "Contracts", href: "/", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 flex h-screen overflow-hidden">

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 w-64 h-full bg-white border-r
        transform ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-all duration-200`}
      >
        {/* Brand */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-800">
            ContractOS
          </h1>
          <p className="text-xs text-slate-500">
            Enterprise Platform
          </p>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md
                ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
              AG
            </div>
            <div>
              <p className="text-sm font-medium">
                Ayush Gaykar
              </p>
              <p className="text-xs text-slate-500">
                Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Top bar */}
        <header className="h-14 bg-white border-b px-6 flex items-center justify-between">
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="text-sm font-semibold">
            Contract Management
          </span>

          <User className="w-5 h-5 text-slate-600" />
        </header>

        {/* Page */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
