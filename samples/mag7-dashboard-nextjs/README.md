# Magnificent 7 Dashboard

A sample Next.js app that compares the Magnificent 7 stocks (AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA) using live data from the hosted [EvidInvest MCP](https://github.com/EvidInvest/mcp) gateway.

Shows at a glance:
- market cap
- current price
- trailing P/E
- bear / base / bull fair value range
- upside vs current price

## Prerequisites

- Node.js 18+
- an EvidInvest MCP API key ([get one here](https://evidinvest.com/developers) — requires a paid plan)

## Quick Start

```bash
cd samples/mag7-dashboard-nextjs
npm install
cp .env.example .env.local
# paste your EVIDINVEST_API_KEY into .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```bash
EVIDINVEST_API_KEY=evid_sk_...
# optional override if you want to point at a different MCP gateway
EVIDINVEST_MCP_URL=https://36dpjzesa7.us-east-1.awsapprunner.com/mcp
```

## What It Does

On load, the app connects to the hosted EvidInvest MCP gateway over **streamable HTTP** using the MCP TypeScript SDK and calls these tools for each Mag7 stock:

| Tool | Data used |
|------|-----------|
| `get_company_profile` | name, sector, market cap, current price |
| `get_fair_value_range` | bear / base / bull fair value + upside |
| `get_pe_ratios` | latest trailing P/E |

Results are shown in:
- a side-by-side comparison table
- individual stock cards
- a clean setup-state screen if the API key is missing or invalid

## No API Key?

The sample degrades gracefully. Without a valid `EVIDINVEST_API_KEY`, it shows a setup message instead of crashing.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- EvidInvest hosted MCP gateway (`/mcp`)
- minimal styling, no UI framework required

## License

MIT — same as the parent repository.
