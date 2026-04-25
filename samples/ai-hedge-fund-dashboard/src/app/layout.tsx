import type { Metadata } from "next";
import Nav from "@/components/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI/DC Fund Dashboard | EvidInvest",
  description:
    "Sample hedge fund dashboard powered by EvidInvest MCP — portfolio management, MPT optimization, risk decomposition, and earnings tracking for AI & datacenter stocks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-zinc-200 antialiased min-h-screen">
        <Nav />
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        <footer className="border-t border-navy-700 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Powered by{" "}
              <a
                href="https://evidinvest.com/developers"
                className="text-gold-500 hover:text-gold-400"
                target="_blank"
                rel="noopener"
              >
                EvidInvest MCP
              </a>
            </span>
            <span>Sample app — mock data for demonstration purposes</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
