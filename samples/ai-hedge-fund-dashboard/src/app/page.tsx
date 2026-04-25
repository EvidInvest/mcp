import { positions, PORTFOLIO_VALUE } from "@/lib/mock-data";

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtUsd(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

function verdictColor(v: string) {
  if (v === "Undervalued") return "text-emerald-400";
  if (v === "Overvalued") return "text-red-400";
  return "text-zinc-400";
}

function upsideColor(pct: number) {
  if (pct > 10) return "text-emerald-400";
  if (pct > 0) return "text-yellow-400";
  return "text-red-400";
}

export default function PortfolioPage() {
  const totalValue = PORTFOLIO_VALUE;
  const weightedUpside = positions.reduce(
    (sum, p) => sum + p.weight * p.upsidePercent,
    0
  );
  const undervaluedCount = positions.filter(
    (p) => p.verdict === "Undervalued"
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Portfolio Overview</h1>
        <p className="text-zinc-400 mt-1">
          AI & Datacenter Infrastructure Fund — 8 positions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Portfolio Value
          </div>
          <div className="text-2xl font-bold text-white">
            {fmtUsd(totalValue)}
          </div>
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Weighted Upside
          </div>
          <div className={`text-2xl font-bold ${upsideColor(weightedUpside)}`}>
            {weightedUpside > 0 ? "+" : ""}
            {fmt(weightedUpside, 1)}%
          </div>
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Undervalued
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {undervaluedCount} / {positions.length}
          </div>
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Overall Verdict
          </div>
          <div className="text-2xl font-bold text-gold-400">Undervalued</div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-navy-700">
          <h2 className="text-lg font-semibold text-white">Positions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-navy-700">
                <th className="text-left px-5 py-3">Ticker</th>
                <th className="text-left px-5 py-3">Company</th>
                <th className="text-right px-5 py-3">Price</th>
                <th className="text-right px-5 py-3">Fair Value</th>
                <th className="text-right px-5 py-3">Upside</th>
                <th className="text-right px-5 py-3">Weight</th>
                <th className="text-right px-5 py-3">Market Value</th>
                <th className="text-right px-5 py-3">P/E (Fwd)</th>
                <th className="text-left px-5 py-3">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => (
                <tr
                  key={p.ticker}
                  className="border-b border-navy-800 hover:bg-navy-800/50 transition-colors"
                >
                  <td className="px-5 py-3 font-mono font-bold text-gold-400">
                    {p.ticker}
                  </td>
                  <td className="px-5 py-3 text-zinc-300">{p.name}</td>
                  <td className="px-5 py-3 text-right text-white font-mono">
                    ${fmt(p.currentPrice)}
                  </td>
                  <td className="px-5 py-3 text-right text-zinc-300 font-mono">
                    ${fmt(p.fairValue)}
                  </td>
                  <td
                    className={`px-5 py-3 text-right font-mono font-semibold ${upsideColor(p.upsidePercent)}`}
                  >
                    {p.upsidePercent > 0 ? "+" : ""}
                    {fmt(p.upsidePercent, 1)}%
                  </td>
                  <td className="px-5 py-3 text-right text-zinc-300 font-mono">
                    {(p.weight * 100).toFixed(1)}%
                  </td>
                  <td className="px-5 py-3 text-right text-zinc-300 font-mono">
                    {fmtUsd(p.currentPrice * p.shares)}
                  </td>
                  <td className="px-5 py-3 text-right text-zinc-300 font-mono">
                    {p.peForward > 0 ? `${fmt(p.peForward, 1)}x` : "N/A"}
                  </td>
                  <td
                    className={`px-5 py-3 font-medium ${verdictColor(p.verdict)}`}
                  >
                    {p.verdict}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Valuation Range */}
      <div className="mt-8 bg-navy-900 border border-navy-700 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-white mb-4">
          Fair Value Ranges
        </h2>
        <div className="space-y-3">
          {positions.map((p) => {
            const min = p.bearCase * 0.8;
            const max = p.bullCase * 1.1;
            const range = max - min;
            const bearPct = ((p.bearCase - min) / range) * 100;
            const fairPct = ((p.fairValue - min) / range) * 100;
            const bullPct = ((p.bullCase - min) / range) * 100;
            const pricePct = ((p.currentPrice - min) / range) * 100;

            return (
              <div key={p.ticker} className="flex items-center gap-4">
                <div className="w-16 font-mono font-bold text-gold-400 text-sm">
                  {p.ticker}
                </div>
                <div className="flex-1 relative h-6">
                  <div className="absolute inset-0 bg-navy-800 rounded-full" />
                  <div
                    className="absolute top-0 bottom-0 bg-navy-600 rounded-full"
                    style={{
                      left: `${bearPct}%`,
                      width: `${bullPct - bearPct}%`,
                    }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-zinc-400"
                    style={{ left: `${fairPct}%` }}
                    title={`Fair: $${p.fairValue}`}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-400 border-2 border-navy-950"
                    style={{ left: `${pricePct}%` }}
                    title={`Price: $${p.currentPrice}`}
                  />
                </div>
                <div className="w-28 text-right text-xs text-zinc-500 font-mono">
                  ${p.bearCase} — ${p.bullCase}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-gold-400 inline-block" />
            Current Price
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-zinc-400 inline-block" />
            Fair Value
          </span>
          <span className="flex items-center gap-1">
            <span className="w-6 h-3 bg-navy-600 rounded-full inline-block" />
            Bear-Bull Range
          </span>
        </div>
      </div>

      {/* MCP Tools Used */}
      <div className="mt-8 bg-navy-900/50 border border-navy-700 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">
          EvidInvest MCP Tools Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "get_company_profile",
            "get_fair_value_range",
            "get_pe_ratios",
            "manage_portfolio",
          ].map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 bg-navy-800 border border-navy-600 rounded-full text-xs font-mono text-gold-400"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
