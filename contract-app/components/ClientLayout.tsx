"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  User,
  Menu,
  ClipboardList,
  Info
} from "lucide-react";
import { useEffect, useState } from "react";

/* TYPES */
type Profile = {
  name: string;
  role: string;
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const [profile, setProfile] =
    useState<Profile>({
      name: "Loading...",
      role: "Loading...",
    });

  useEffect(() => {
    setMounted(true);

    const saved =
      localStorage.getItem("settings");

    if (saved) {
      const data = JSON.parse(saved);
      setProfile({
        name: data.name,
        role: data.role,
      });
    } else {
      setProfile({
        name: "Ayush Gaykar",
        role: "Admin",
      });
    }
  }, []);

  if (!mounted) return null;

 const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Create Contract",
    href: "/create",
    icon: FileText,
  },
  {
    name: "Blueprints",
    href: "/blueprints",
    icon: FileText,
  },
  {
    name: "Audit Logs",
    href: "/logs",
    icon: ClipboardList,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
];


  return (
    <div className="min-h-screen">

      {/* TOP NAV */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-semibold text-lg">
              ContractFlow
            </span>
          </div>

          {/* NAV TABS */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const active =
                pathname === item.href;

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
                  ${
                    active
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
              {profile.name[0]}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">
                {profile.name}
              </p>
              <p className="text-xs text-slate-500">
                {profile.role}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* PAGE */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
