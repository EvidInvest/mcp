import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magnificent 7 Dashboard — EvidInvest MCP",
  description:
    "Side-by-side comparison of the Magnificent 7 stocks powered by EvidInvest MCP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: "#0a0a0f",
          color: "#e4e4e7",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
