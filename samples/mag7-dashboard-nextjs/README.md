# Magnificent 7 Dashboard

A sample Next.js app that compares the Magnificent 7 stocks (AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA) using live data from the [EvidInvest MCP](https://github.com/EvidInvest/mcp) server.

Shows at a glance: market cap, P/E ratios, DCF fair value, margin of safety, and MPT-optimal portfolio weights.

## Prerequisites

- Node.js 18+
- An EvidInvest API key ([get one here](https://evidinvest.com/developers) — requires Pro subscription)

## Quick Start

```bash
cd samples/mag7-dashboard-nextjs

# Install dependencies
npm install

# Configure your API key
cp .env.example .env
# Edit .env and paste your EVIDINVEST_API_KEY

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What It Does

On load, the app connects to the EvidInvest MCP server (via `@modelcontextprotocol/sdk`) and calls these tools for each Mag7 stock:

| Tool | Data |
|------|------|
| `get_company_profile` | Name, sector, market cap, price |
| `get_dcf_valuation` | Fair value estimate, margin of safety |
| `get_pe_ratios` | Trailing and forward P/E |
| `get_mpt_optimization` | Optimal portfolio weights, Sharpe ratio |

Results are displayed in a comparison table, individual stock cards, and an MPT allocation chart.

## No API Key?

The dashboard degrades gracefully. Without a valid `EVIDINVEST_API_KEY`, it shows a setup guide instead of crashing.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [EvidInvest MCP Server](https://github.com/EvidInvest/mcp)
- Zero CSS dependencies — inline styles for portability

## License

MIT — same as the parent repository.
