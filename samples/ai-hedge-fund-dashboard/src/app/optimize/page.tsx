import { positions, optimization } from "@/lib/mock-data";

function pct(n: number) {
  return (n * 100).toFixed(1) + "%";
}

export default function OptimizePage() {
  const equalWeight = 1 / positions.length;
  const sortedTickers = Object.entries(optimization.weights)
    .sort(([, a], [, b]) => b - a)
    .map(([ticker]) => ticker);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Portfolio Optimization
        </h1>
        <p className="text-zinc-400 mt-1">
          Modern Portfolio Theory — Maximum Sharpe Ratio
        </p>
      </div>

      {/* Efficient Frontier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Expected Return
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {pct(optimization.expectedReturn)}
          </div>
          <div className="text-xs text-zinc-500 mt-1">Annualized</div>
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Volatility
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {pct(optimization.volatility)}
          </div>
          <div className="text-xs text-zinc-500 mt-1">Annualized Std Dev</div>
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Sharpe Ratio
          </div>
          <div className="text-2xl font-bold text-gold-400">
            {optimization.sharpeRatio.toFixed(2)}
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            Risk-free rate: 4.3%
          </div>
        </div>
      </div>

      {/* Weight Comparison */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-navy-700">
          <h2 className="text-lg font-semibold text-white">
            Optimal vs Equal Weight
          </h2>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {sortedTickers.map((ticker) => {
              const optimal = optimization.weights[ticker] ?? 0;
              const position = positions.find((p) => p.ticker === ticker);
              const excluded = optimal === 0;

              return (
                <div key={ticker} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono font-bold ${excluded ? "text-zinc-600" : "text-gold-400"}`}
                      >
                        {ticker}
                      </span>
                      <span className="text-zinc-500">
                        {position?.name ?? ""}
                      </span>
                      {excluded && (
                        <span className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-xs">
                          Excluded
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 font-mono text-xs">
                      <span className="text-zinc-500">
                        Equal: {pct(equalWeight)}
                      </span>
                      <span
                        className={excluded ? "text-zinc-600" : "text-white"}
                      >
                        Optimal: {pct(optimal)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-5">
                    <div className="relative flex-1 bg-navy-800 rounded-l overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-navy-600 rounded-l"
                        style={{ width: `${equalWeight * 100 * 3}%` }}
                      />
                      <span className="absolute inset-0 flex items-center px-2 text-xs text-zinc-400">
                        Current
                      </span>
                    </div>
                    <div className="relative flex-1 bg-navy-800 rounded-r overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-r ${excluded ? "bg-zinc-800" : "bg-gold-500/30"}`}
                        style={{ width: `${optimal * 100 * 3}%` }}
                      />
                      <span className="absolute inset-0 flex items-center px-2 text-xs text-zinc-400">
                        Optimal
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Excluded Tickers */}
      {optimization.excludedTickers.length > 0 && (
        <div className="bg-navy-900 border border-navy-700 rounded-lg overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-navy-700">
            <h2 className="text-lg font-semibold text-white">
              Excluded from Optimal Portfolio
            </h2>
          </div>
          <div className="divide-y divide-navy-700">
            {optimization.excludedTickers.map((ex) => (
              <div key={ex.ticker} className="px-5 py-4 flex gap-4">
                <div className="font-mono font-bold text-red-400 w-14">
                  {ex.ticker}
                </div>
                <div className="text-sm text-zinc-400">{ex.reason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MCP Tools Used */}
      <div className="bg-navy-900/50 border border-navy-700 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">
          EvidInvest MCP Tools Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "optimize_portfolio_mpt",
            "get_return_statistics",
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
