"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Settings() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("settings");

    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name);
      setRole(data.role);
    } else {
      setName("Ayush Gaykar");
      setRole("User");
    }
  }, []);

  function handleSave() {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          name,
          role,
        })
      );

      toast.success("Profile updated!");
      setLoading(false);
    }, 400);
  }

  return (
    <div className="max-w-2xl">

      <h1 className="text-2xl font-semibold mb-6">
        Settings
      </h1>

      <div className="bg-white border rounded-xl p-8 space-y-6 shadow-sm">

        {/* Profile */}
        <div>
          <h2 className="font-medium mb-4">
            Profile Information
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="text-sm text-slate-600">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="mt-1 w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Role
              </label>
              <input
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="mt-1 w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your role"
              />
            </div>

          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
