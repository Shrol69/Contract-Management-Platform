"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Save,
} from "lucide-react";

/* TYPES */
type Company = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function Settings() {
  const { company, updateCompany } = useStore();

  const [form, setForm] =
    useState<Company>(company);

  function handleSave() {
    updateCompany(form);
    toast.success(
      "Company profile updated successfully"
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Company Settings
        </h1>
        <p className="text-sm text-slate-500">
          Manage your organization details
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">

        <div className="grid sm:grid-cols-2 gap-6">

          <Input
            label="Company Name"
            icon={<Building size={16} />}
            value={form.name}
            onChange={(v) =>
              setForm({
                ...form,
                name: v,
              })
            }
          />

          <Input
            label="Email"
            icon={<Mail size={16} />}
            value={form.email}
            onChange={(v) =>
              setForm({
                ...form,
                email: v,
              })
            }
          />

          <Input
            label="Phone"
            icon={<Phone size={16} />}
            value={form.phone}
            onChange={(v) =>
              setForm({
                ...form,
                phone: v,
              })
            }
          />

          <Input
            label="Address"
            icon={<MapPin size={16} />}
            value={form.address}
            onChange={(v) =>
              setForm({
                ...form,
                address: v,
              })
            }
          />
        </div>

        {/* ACTION */}
        <div className="pt-4 border-t flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT */

type InputProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
};

function Input({
  label,
  value,
  icon,
  onChange,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full border pl-10 pr-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}
