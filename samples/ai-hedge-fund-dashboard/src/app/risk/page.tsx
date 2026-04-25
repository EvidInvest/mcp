import { risk, PORTFOLIO_VALUE } from "@/lib/mock-data";

function pct(n: number) {
  return (n * 100).toFixed(2) + "%";
}

function fmtUsd(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

export default function RiskPage() {
  const varDollars = PORTFOLIO_VALUE * risk.portfolioVar95;
  const cvarDollars = PORTFOLIO_VALUE * risk.portfolioCVar95;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Risk Decomposition</h1>
        <p className="text-zinc-400 mt-1">
          Value at Risk, Expected Shortfall & marginal contributions
        </p>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            VaR (95%, 1-day)
          </div>
          <div className="text-2xl font-bold text-red-400">
            {pct(risk.portfolioVar95)}
          </div>
          <div className="text-sm text-zinc-500 mt-1">
            {fmtUsd(varDollars)} at risk
          </div>
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            CVaR (95%, 1-day)
          </div>
          <div className="text-2xl font-bold text-red-400">
            {pct(risk.portfolioCVar95)}
          </div>
          <div className="text-sm text-zinc-500 mt-1">
            {fmtUsd(cvarDollars)} expected shortfall
          </div>
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Diversification Ratio
          </div>
          <div className="text-2xl font-bold text-gold-400">
            {risk.diversificationRatio.toFixed(2)}x
          </div>
          <div className="text-sm text-zinc-500 mt-1">
            {risk.diversificationRatio > 1.3 ? "Good" : "Low"} diversification
            benefit
          </div>
        </div>
      </div>

      {/* Marginal Contributions Table */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-navy-700">
          <h2 className="text-lg font-semibold text-white">
            Marginal Contribution to VaR
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-navy-700">
                <th className="text-left px-5 py-3">Ticker</th>
                <th className="text-right px-5 py-3">Weight</th>
                <th className="text-right px-5 py-3">Marginal VaR</th>
                <th className="text-right px-5 py-3">$ at Risk</th>
                <th className="text-right px-5 py-3">% of Total Risk</th>
                <th className="text-left px-5 py-3 w-80">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {risk.marginalContributions
                .sort((a, b) => b.percentContribution - a.percentContribution)
                .map((mc) => (
                  <tr
                    key={mc.ticker}
                    className="border-b border-navy-800 hover:bg-navy-800/50 transition-colors"
                  >
                    <td className="px-5 py-3 font-mono font-bold text-gold-400">
                      {mc.ticker}
                    </td>
                    <td className="px-5 py-3 text-right text-zinc-300 font-mono">
                      {(mc.weight * 100).toFixed(1)}%
                    </td>
                    <td className="px-5 py-3 text-right text-red-400 font-mono">
                      {pct(mc.marginalVar)}
                    </td>
                    <td className="px-5 py-3 text-right text-zinc-300 font-mono">
                      {fmtUsd(
                        PORTFOLIO_VALUE * mc.weight * mc.marginalVar
                      )}
                    </td>
                    <td className="px-5 py-3 text-right text-zinc-300 font-mono">
                      {mc.percentContribution.toFixed(1)}%
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-navy-800 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-400"
                            style={{ width: `${mc.percentContribution}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk/Weight Mismatch */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg p-5 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          Risk vs Weight Ratio
        </h2>
        <p className="text-sm text-zinc-400 mb-4">
          Positions where risk contribution exceeds weight indicate concentrated
          risk. A ratio above 1.5x suggests the position is contributing
          disproportionately to portfolio risk.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {risk.marginalContributions.map((mc) => {
            const ratio = mc.percentContribution / (mc.weight * 100);
            const isHigh = ratio > 1.3;
            return (
              <div
                key={mc.ticker}
                className={`rounded-lg p-4 border ${isHigh ? "bg-red-500/5 border-red-500/20" : "bg-navy-800 border-navy-700"}`}
              >
                <div className="font-mono font-bold text-gold-400 text-sm">
                  {mc.ticker}
                </div>
                <div
                  className={`text-xl font-bold mt-1 ${isHigh ? "text-red-400" : "text-zinc-300"}`}
                >
                  {ratio.toFixed(2)}x
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {mc.percentContribution.toFixed(1)}% risk /{" "}
                  {(mc.weight * 100).toFixed(1)}% weight
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MCP Tools Used */}
      <div className="bg-navy-900/50 border border-navy-700 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">
          EvidInvest MCP Tools Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "get_portfolio_risk_decomposition",
            "get_var_cvar",
            "get_correlation_matrix",
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
