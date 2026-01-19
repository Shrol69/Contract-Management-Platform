import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, User } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContractOS",
  description: "Enterprise Contract Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex h-screen overflow-hidden`}>
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-blue-800 tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6" /> Eurusys
            </h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-md">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md cursor-not-allowed opacity-50">
              <FileText className="w-4 h-4" /> All Contracts
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md cursor-not-allowed opacity-50">
              <Settings className="w-4 h-4" /> Settings
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                JD
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

      </body>
    </html>
  );
}