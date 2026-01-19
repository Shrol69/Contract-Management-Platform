"use client";

export default function Settings() {
  return (
    <div className="max-w-2xl">

      <h1 className="text-2xl font-semibold mb-6">
        Settings
      </h1>

      <div className="bg-white border rounded-xl p-6 space-y-6">

        {/* Profile */}
        <div>
          <h2 className="font-medium mb-2">
            Profile
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border px-4 py-2 rounded-md text-sm"
              defaultValue="Ayush Gaykar"
            />
            <input
              className="border px-4 py-2 rounded-md text-sm"
              defaultValue="Admin"
            />
          </div>
        </div>

        {/* Theme */}
        <div>
          <h2 className="font-medium mb-2">
            Preferences
          </h2>

          <select className="border px-4 py-2 rounded-md text-sm">
            <option>Light mode</option>
            <option>Dark mode</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          Save changes
        </button>
      </div>
    </div>
  );
}
