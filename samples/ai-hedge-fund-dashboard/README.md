# AI/DC Hedge Fund Dashboard

A sample Next.js dashboard showcasing the [EvidInvest MCP](https://evidinvest.com/developers) toolkit for managing an AI & datacenter infrastructure-focused hedge fund portfolio.

![Dark theme dashboard with gold accents](https://img.shields.io/badge/theme-dark%20navy%20%2B%20gold-0a1128)

## What This Demonstrates

| Page | MCP Tools Used | What It Shows |
|------|---------------|---------------|
| **Portfolio Overview** | `get_company_profile`, `get_fair_value_range`, `get_pe_ratios`, `manage_portfolio` | Positions table with live valuations, fair value ranges (bear/base/bull), weighted portfolio upside |
| **Optimization** | `optimize_portfolio_mpt`, `get_return_statistics`, `get_correlation_matrix` | MPT Max Sharpe optimal weights vs equal-weight, which stocks the optimizer excludes and why |
| **Risk** | `get_portfolio_risk_decomposition`, `get_var_cvar`, `get_correlation_matrix` | VaR/CVaR at 95%, per-position marginal contribution to risk, diversification ratio |
| **Earnings** | `get_upcoming_earnings`, `get_earnings_history` | Upcoming earnings calendar, recent beat/miss results with EPS surprise |

## Quick Start

```bash
cd samples/ai-hedge-fund-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The demo ships with **realistic mock data** — no API key needed to explore.

## Connect to Live Data

To use real EvidInvest MCP data instead of mocks:

1. Get an API key at [evidinvest.com/developers](https://evidinvest.com/developers)
2. Copy the env template:
   ```bash
   cp .env.example .env.local
   ```
3. Add your key:
   ```
   EVIDINVEST_API_KEY=evid_sk_your_key_here
   EVIDINVEST_MCP_URL=https://mcp.evidinvest.com/mcp
   ```
4. Replace mock data imports with MCP client calls (see the [mag7-dashboard](../mag7-dashboard-nextjs/) sample for a live-data reference implementation)

## Portfolio

The sample tracks 8 AI/datacenter stocks:

| Ticker | Company | Focus |
|--------|---------|-------|
| NVDA | NVIDIA | GPU / AI accelerators |
| AMD | Advanced Micro Devices | CPU/GPU |
| AVGO | Broadcom | Networking / custom AI silicon |
| TSM | Taiwan Semiconductor | Foundry |
| ASML | ASML Holding | Lithography equipment |
| MRVL | Marvell Technology | Data infrastructure |
| INTC | Intel | CPU / foundry turnaround |
| SMCI | Super Micro Computer | AI server systems |

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- [Tailwind CSS v4](https://tailwindcss.com/)
- TypeScript
- No external UI libraries

## License

MIT — see the [repo root](../../LICENSE) for details.
