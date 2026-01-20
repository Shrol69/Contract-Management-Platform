"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import toast from "react-hot-toast";

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
    toast.success("Company profile updated");
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <h1 className="text-2xl font-semibold">
        Company Profile
      </h1>

      <div className="bg-white border rounded-xl p-6 space-y-4">

        <Input
          label="Company Name"
          value={form.name}
          onChange={(v) =>
            setForm({ ...form, name: v })
          }
        />

        <Input
          label="Email"
          value={form.email}
          onChange={(v) =>
            setForm({ ...form, email: v })
          }
        />

        <Input
          label="Phone"
          value={form.phone}
          onChange={(v) =>
            setForm({ ...form, phone: v })
          }
        />

        <Input
          label="Address"
          value={form.address}
          onChange={(v) =>
            setForm({ ...form, address: v })
          }
        />

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function Input({
  label,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border px-4 py-2 rounded-md text-sm mt-1"
      />
    </div>
  );
}
