import { fetchDashboardData } from "@/lib/mcp-client";
import type { DashboardData, StockData } from "@/lib/mcp-client";

// ── Styles (inline to keep the sample zero-config) ──────────────────────

const styles = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "2rem 1.5rem",
  } as React.CSSProperties,
  header: {
    textAlign: "center" as const,
    marginBottom: "2.5rem",
  } as React.CSSProperties,
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    margin: 0,
    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as React.CSSProperties,
  subtitle: {
    color: "#71717a",
    marginTop: "0.5rem",
    fontSize: "0.95rem",
  } as React.CSSProperties,
  badge: {
    display: "inline-block",
    background: "#1e1b4b",
    color: "#a78bfa",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    marginTop: "0.75rem",
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  } as React.CSSProperties,
  card: {
    background: "#18181b",
    border: "1px solid #27272a",
    borderRadius: "0.75rem",
    padding: "1.25rem",
    transition: "border-color 0.15s",
  } as React.CSSProperties,
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  } as React.CSSProperties,
  symbol: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#f4f4f5",
  } as React.CSSProperties,
  companyName: {
    fontSize: "0.8rem",
    color: "#71717a",
    marginTop: "0.15rem",
  } as React.CSSProperties,
  metricRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.35rem 0",
    fontSize: "0.85rem",
    borderBottom: "1px solid #1f1f23",
  } as React.CSSProperties,
  metricLabel: {
    color: "#a1a1aa",
  } as React.CSSProperties,
  metricValue: {
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "0.85rem",
    background: "#18181b",
    borderRadius: "0.75rem",
    overflow: "hidden",
    border: "1px solid #27272a",
  } as React.CSSProperties,
  th: {
    textAlign: "left" as const,
    padding: "0.75rem 1rem",
    background: "#1e1b4b",
    color: "#c4b5fd",
    fontWeight: 600,
    fontSize: "0.75rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  } as React.CSSProperties,
  td: {
    padding: "0.65rem 1rem",
    borderBottom: "1px solid #1f1f23",
  } as React.CSSProperties,
  setupBox: {
    background: "#18181b",
    border: "1px solid #27272a",
    borderRadius: "0.75rem",
    padding: "2.5rem",
    textAlign: "center" as const,
    maxWidth: 600,
    margin: "3rem auto",
  } as React.CSSProperties,
  setupTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#f4f4f5",
  } as React.CSSProperties,
  setupStep: {
    textAlign: "left" as const,
    background: "#0f0f14",
    borderRadius: "0.5rem",
    padding: "1rem 1.25rem",
    marginTop: "1rem",
    fontSize: "0.85rem",
    lineHeight: 1.7,
  } as React.CSSProperties,
  code: {
    background: "#27272a",
    padding: "0.15rem 0.4rem",
    borderRadius: "0.25rem",
    fontFamily: "monospace",
    fontSize: "0.8rem",
  } as React.CSSProperties,
  portfolioSection: {
    background: "#18181b",
    border: "1px solid #27272a",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    marginBottom: "2rem",
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#c4b5fd",
  } as React.CSSProperties,
  weightBar: {
    height: 8,
    borderRadius: 4,
    background: "#27272a",
    overflow: "hidden",
    flex: 1,
    marginLeft: "0.75rem",
    marginRight: "0.5rem",
  } as React.CSSProperties,
  spinner: {
    display: "inline-block",
    width: 20,
    height: 20,
    border: "2px solid #27272a",
    borderTopColor: "#6366f1",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  } as React.CSSProperties,
  footer: {
    textAlign: "center" as const,
    padding: "2rem 0 1rem",
    color: "#52525b",
    fontSize: "0.75rem",
  } as React.CSSProperties,
} as const;

// ── Helpers ──────────────────────────────────────────────────────────────

function fmt(n: number | null | undefined, opts?: { prefix?: string; suffix?: string; decimals?: number }): string {
  if (n == null) return "--";
  const d = opts?.decimals ?? 1;
  const formatted = d === 0 ? Math.round(n).toLocaleString() : n.toFixed(d);
  return `${opts?.prefix ?? ""}${formatted}${opts?.suffix ?? ""}`;
}

function fmtCap(n: number | null): string {
  if (n == null) return "--";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  return `$${(n / 1e6).toFixed(0)}M`;
}

function marginColor(margin: number | null): string {
  if (margin == null) return "#a1a1aa";
  if (margin > 15) return "#4ade80";
  if (margin > 0) return "#facc15";
  return "#f87171";
}

// ── Components ──────────────────────────────────────────────────────────

function SetupState({ message }: { message?: string }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Magnificent 7 Dashboard</h1>
        <p style={styles.subtitle}>Powered by EvidInvest MCP</p>
      </div>
      <div style={styles.setupBox}>
        <div style={styles.setupTitle}>
          {message === "loading" ? "Loading Mag7 data..." : "MCP Setup Required"}
        </div>
        {message === "loading" ? (
          <div>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            <div style={styles.spinner} />
            <p style={{ color: "#71717a", fontSize: "0.85rem", marginTop: "1rem" }}>
              Connecting to EvidInvest MCP and fetching data for 7 stocks...
            </p>
          </div>
        ) : (
          <>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
              This dashboard needs a running EvidInvest MCP server to fetch live data.
            </p>
            <div style={styles.setupStep}>
              <strong>1.</strong> Get an API key at{" "}
              <a href="https://evidinvest.com/developers" style={{ color: "#a78bfa" }}>
                evidinvest.com/developers
              </a>
              <br />
              <strong>2.</strong> Copy <span style={styles.code}>.env.example</span> to{" "}
              <span style={styles.code}>.env</span> and paste your key
              <br />
              <strong>3.</strong> Restart the dev server:{" "}
              <span style={styles.code}>npm run dev</span>
            </div>
            {message && message !== "loading" && (
              <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "1rem" }}>
                Error: {message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StockCard({ stock }: { stock: StockData }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div>
          <div style={styles.symbol}>{stock.symbol}</div>
          <div style={styles.companyName}>{stock.name}</div>
        </div>
        <div style={{ ...styles.badge, background: "#1a1a2e" }}>{stock.sector}</div>
      </div>
      <div style={styles.metricRow}>
        <span style={styles.metricLabel}>Market Cap</span>
        <span style={styles.metricValue}>{fmtCap(stock.marketCap)}</span>
      </div>
      <div style={styles.metricRow}>
        <span style={styles.metricLabel}>Price</span>
        <span style={styles.metricValue}>{fmt(stock.currentPrice, { prefix: "$", decimals: 2 })}</span>
      </div>
      <div style={styles.metricRow}>
        <span style={styles.metricLabel}>Fair Value (DCF)</span>
        <span style={styles.metricValue}>{fmt(stock.fairValue, { prefix: "$", decimals: 2 })}</span>
      </div>
      <div style={styles.metricRow}>
        <span style={styles.metricLabel}>P/E</span>
        <span style={styles.metricValue}>{fmt(stock.pe)}</span>
      </div>
      <div style={styles.metricRow}>
        <span style={styles.metricLabel}>Forward P/E</span>
        <span style={styles.metricValue}>{fmt(stock.forwardPe)}</span>
      </div>
      <div style={{ ...styles.metricRow, borderBottom: "none" }}>
        <span style={styles.metricLabel}>Margin of Safety</span>
        <span style={{ ...styles.metricValue, color: marginColor(stock.marginOfSafety) }}>
          {fmt(stock.marginOfSafety, { suffix: "%", decimals: 1 })}
        </span>
      </div>
    </div>
  );
}

function PortfolioSection({ portfolio }: { portfolio: NonNullable<DashboardData["portfolio"]> }) {
  const entries = Object.entries(portfolio.weights).sort((a, b) => b[1] - a[1]);
  const maxWeight = Math.max(...entries.map(([, w]) => w), 1);

  return (
    <div style={styles.portfolioSection}>
      <div style={styles.sectionTitle}>MPT Optimal Allocation (Max Sharpe)</div>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {portfolio.sharpe != null && (
          <div>
            <div style={{ color: "#71717a", fontSize: "0.75rem" }}>Sharpe Ratio</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#4ade80" }}>
              {portfolio.sharpe.toFixed(2)}
            </div>
          </div>
        )}
        {portfolio.expectedReturn != null && (
          <div>
            <div style={{ color: "#71717a", fontSize: "0.75rem" }}>Expected Return</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {(portfolio.expectedReturn * (portfolio.expectedReturn < 1 ? 100 : 1)).toFixed(1)}%
            </div>
          </div>
        )}
        {portfolio.volatility != null && (
          <div>
            <div style={{ color: "#71717a", fontSize: "0.75rem" }}>Volatility</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#facc15" }}>
              {(portfolio.volatility * (portfolio.volatility < 1 ? 100 : 1)).toFixed(1)}%
            </div>
          </div>
        )}
      </div>
      {entries.map(([symbol, weight]) => (
        <div key={symbol} style={{ display: "flex", alignItems: "center", padding: "0.3rem 0", fontSize: "0.85rem" }}>
          <span style={{ width: 50, fontWeight: 600 }}>{symbol}</span>
          <div style={styles.weightBar}>
            <div
              style={{
                height: "100%",
                width: `${(weight / maxWeight) * 100}%`,
                background: "linear-gradient(90deg, #6366f1, #a78bfa)",
                borderRadius: 4,
              }}
            />
          </div>
          <span style={{ width: 45, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
            {(weight * (weight < 1 ? 100 : 1)).toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
}

function ComparisonTable({ stocks }: { stocks: StockData[] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
      <div style={styles.sectionTitle}>Side-by-Side Comparison</div>
      <table style={styles.table}>
        <thead>
          <tr>
            {["Symbol", "Company", "Mkt Cap", "Price", "Fair Value", "P/E", "Fwd P/E", "Margin of Safety"].map((h) => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.symbol}>
              <td style={{ ...styles.td, fontWeight: 700 }}>{s.symbol}</td>
              <td style={{ ...styles.td, color: "#a1a1aa" }}>{s.name}</td>
              <td style={styles.td}>{fmtCap(s.marketCap)}</td>
              <td style={styles.td}>{fmt(s.currentPrice, { prefix: "$", decimals: 2 })}</td>
              <td style={styles.td}>{fmt(s.fairValue, { prefix: "$", decimals: 2 })}</td>
              <td style={styles.td}>{fmt(s.pe)}</td>
              <td style={styles.td}>{fmt(s.forwardPe)}</td>
              <td style={{ ...styles.td, color: marginColor(s.marginOfSafety), fontWeight: 600 }}>
                {fmt(s.marginOfSafety, { suffix: "%", decimals: 1 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

export default async function Home() {
  const data: DashboardData = await fetchDashboardData();

  if (data.setupRequired) {
    return <SetupState message={data.message ?? undefined} />;
  }

  return (
    <div style={styles.container}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={styles.header}>
        <h1 style={styles.title}>Magnificent 7 Dashboard</h1>
        <p style={styles.subtitle}>
          Live fundamental comparison powered by EvidInvest MCP
        </p>
        <span style={styles.badge}>
          Data fetched {new Date(data.fetchedAt).toLocaleString()}
        </span>
      </div>

      {data.portfolio && <PortfolioSection portfolio={data.portfolio} />}

      <ComparisonTable stocks={data.stocks} />

      <div style={styles.sectionTitle}>Stock Cards</div>
      <div style={styles.grid}>
        {data.stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>

      <div style={styles.footer}>
        Built with{" "}
        <a href="https://github.com/EvidInvest/mcp" style={{ color: "#6366f1" }}>
          EvidInvest MCP
        </a>{" "}
        &middot; Sample app &middot; Not financial advice
      </div>
    </div>
  );
}
