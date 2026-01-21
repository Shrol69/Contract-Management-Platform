"use client";

import {
  Target,
  Eye,
  HeartHandshake,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">

      {/* HERO */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          About Eurusys
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Eurusys is a technology-focused company delivering
          smart digital transformation solutions across the UAE
          and international markets. We empower organizations
          by bridging visionary ideas with practical execution
          through modern software systems.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <Card
          icon={<Target />}
          title="Our Mission"
          text="To empower businesses with scalable,
          secure, and future-ready technology solutions
          that drive measurable impact."
        />

        <Card
          icon={<Eye />}
          title="Our Vision"
          text="To become a trusted global partner
          for smart transformation and digital innovation."
        />

        <Card
          icon={<HeartHandshake />}
          title="Our Values"
          text="Quality, transparency, collaboration,
          and a strong customer-first mindset."
        />
      </div>

      {/* CONTACT */}
      <div className="bg-white border rounded-xl p-8 shadow-sm space-y-5">

        <h2 className="text-xl font-semibold">
          Contact Information
        </h2>

        <Info
          icon={<Mail size={18} />}
          label="Email"
          value="info@eurusys.com"
        />

        <Info
          icon={<MapPin size={18} />}
          label="Location"
          value="Abu Dhabi, UAE"
        />

        <Info
          icon={<Globe size={18} />}
          label="Website"
          value="www.eurusys.com"
          link="https://www.eurusys.com"
        />
      </div>
    </div>
  );
}

/* CARD */

function Card({
  icon,
  title,
  text,
}: any) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3 hover:shadow-md transition slide-up">
      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

/* INFO ROW */

function Info({
  icon,
  label,
  value,
  link,
}: any) {
  return (
    <div className="flex items-center gap-4 text-sm">

      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
        {icon}
      </div>

      <div>
        <p className="text-slate-500">
          {label}
        </p>

        {link ? (
          <a
            href={link}
            target="_blank"
            className="font-medium text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="font-medium">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
