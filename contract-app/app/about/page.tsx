"use client";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">
          About Eurusys
        </h1>
        <p className="text-slate-600 leading-relaxed mt-2">
          Eurusys is a technology-focused company delivering
          smart digital transformation solutions across the UAE
          and international markets. We empower organizations
          by bridging visionary ideas with practical execution
          through modern software systems.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Our Mission
          </h3>
          <p className="text-sm text-slate-600">
            To empower businesses with scalable,
            secure, and future-ready technology
            solutions that drive real impact.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Our Vision
          </h3>
          <p className="text-sm text-slate-600">
            To become a trusted global partner
            for smart transformation and
            digital innovation.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Our Values
          </h3>
          <p className="text-sm text-slate-600">
            Quality, transparency,
            collaboration, and
            customer-first mindset.
          </p>
        </div>
      </div>

      {/* CONTACT */}
      <div className="bg-white border rounded-lg p-6 space-y-3">
        <h2 className="font-semibold">
          Contact Information
        </h2>

        <p className="text-sm text-slate-600">
          Email:
          <span className="font-medium ml-2">
            info@eurusys.com
          </span>
        </p>

        <p className="text-sm text-slate-600">
          Location:
          <span className="font-medium ml-2">
            Abu Dhabi, UAE
          </span>
        </p>

        <p className="text-sm text-slate-600">
          Website:
          <a
            href="https://www.eurusys.com"
            target="_blank"
            className="text-blue-600 ml-2"
          >
            www.eurusys.com
          </a>
        </p>
      </div>
    </div>
  );
}
