import { earnings } from "@/lib/mock-data";

function statusBadge(status: string) {
  switch (status) {
    case "beat":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "miss":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "inline":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    default:
      return "bg-navy-700 text-zinc-400 border-navy-600";
  }
}

function statusLabel(status: string) {
  switch (status) {
    case "beat":
      return "Beat";
    case "miss":
      return "Miss";
    case "inline":
      return "Inline";
    default:
      return "Upcoming";
  }
}

function timeBadge(time: string) {
  switch (time) {
    case "BMO":
      return "Before Market Open";
    case "AMC":
      return "After Market Close";
    default:
      return "TBD";
  }
}

export default function EarningsPage() {
  const upcoming = earnings.filter((e) => e.status === "upcoming");
  const recent = earnings.filter((e) => e.status !== "upcoming");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Earnings Calendar</h1>
        <p className="text-zinc-400 mt-1">
          Upcoming and recent earnings for portfolio holdings
        </p>
      </div>

      {/* Recent Results */}
      {recent.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((e) => (
              <div
                key={e.ticker}
                className="bg-navy-900 border border-navy-700 rounded-lg p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-mono font-bold text-gold-400 text-lg">
                      {e.ticker}
                    </span>
                    <span className="text-zinc-500 text-sm ml-2">
                      {e.name}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded border text-xs font-semibold ${statusBadge(e.status)}`}
                  >
                    {statusLabel(e.status)}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 mb-3">
                  {e.date} — {timeBadge(e.time)}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-zinc-500 mb-0.5">EPS Est</div>
                    <div className="font-mono text-zinc-300">
                      ${e.epsEstimate.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-0.5">
                      EPS Actual
                    </div>
                    <div
                      className={`font-mono font-semibold ${e.status === "beat" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {e.epsActual !== null
                        ? `$${e.epsActual.toFixed(2)}`
                        : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-0.5">Rev Est</div>
                    <div className="font-mono text-zinc-300">
                      {e.revEstimate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-0.5">
                      Rev Actual
                    </div>
                    <div
                      className={`font-mono font-semibold ${e.status === "beat" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {e.revActual ?? "—"}
                    </div>
                  </div>
                </div>
                {e.surprise !== null && (
                  <div className="mt-3 pt-3 border-t border-navy-700">
                    <span className="text-xs text-zinc-500">
                      EPS Surprise:{" "}
                    </span>
                    <span
                      className={`font-mono text-sm font-semibold ${e.surprise > 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {e.surprise > 0 ? "+" : ""}
                      {e.surprise.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Earnings */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Upcoming</h2>
        <div className="bg-navy-900 border border-navy-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-navy-700">
                  <th className="text-left px-5 py-3">Ticker</th>
                  <th className="text-left px-5 py-3">Company</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Time</th>
                  <th className="text-right px-5 py-3">EPS Est</th>
                  <th className="text-right px-5 py-3">Rev Est</th>
                </tr>
              </thead>
              <tbody>
                {upcoming
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .map((e) => (
                    <tr
                      key={e.ticker}
                      className="border-b border-navy-800 hover:bg-navy-800/50 transition-colors"
                    >
                      <td className="px-5 py-3 font-mono font-bold text-gold-400">
                        {e.ticker}
                      </td>
                      <td className="px-5 py-3 text-zinc-300">{e.name}</td>
                      <td className="px-5 py-3 text-zinc-300">{e.date}</td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-0.5 bg-navy-700 border border-navy-600 rounded text-xs text-zinc-400">
                          {e.time}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-zinc-300">
                        ${e.epsEstimate.toFixed(2)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-zinc-300">
                        {e.revEstimate}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MCP Tools Used */}
      <div className="bg-navy-900/50 border border-navy-700 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">
          EvidInvest MCP Tools Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {["get_upcoming_earnings", "get_earnings_history"].map((tool) => (
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
