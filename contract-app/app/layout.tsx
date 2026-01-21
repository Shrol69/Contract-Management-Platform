import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/components/ClientLayout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
