# EvidInvest MCP

Public docs, connection info, prompt skills, and sample apps for the **EvidInvest MCP** ecosystem.

This repo is intentionally **public**.
It is for:
- connection/setup guidance for different MCP clients
- reusable skill/prompt files
- examples you can paste into AI tools
- public sample apps built on top of EvidInvest MCP

> The actual MCP server logic and infra live in EvidInvest's **private infra repo**. This public repo is for usage, docs, and samples.

## Repo layout

- `skills/` — reusable workflow guides / prompt skills
- `examples/` — short copy-paste prompt examples
- `samples/` — runnable sample apps
- `claude-plugin.json` — example MCP config artifact for supported desktop/editor workflows

## Hosted MCP gateway

Current hosted gateway:
- **Endpoint:** `https://mcp.evidinvest.com/mcp`
- **Transport:** `streamable-http`
- **Auth:** `Authorization: Bearer evid_sk_...`

Get an API key at:
- **https://evidinvest.com/developers**

## Connection notes

Different MCP clients support different config formats and transports.
Use this repo as the source of truth for:
- hosted endpoint
- auth expectations
- skills/examples
- sample apps

The included `claude-plugin.json` is an example configuration artifact, but always verify the current format your client expects.

## What EvidInvest MCP gives you

37 tools across 6 categories:

| Category | Tools | Examples |
|----------|-------|---------|
| **Financial Data** | 6 | Company profile, income statement, balance sheet, cash flow, growth rates, PE ratios |
| **Market Data** | 8 | Current price, historical prices, enterprise value, peers, multiples, dividends |
| **Calculations** | 5 | WACC, DCF, margin of safety, comparables, DDM |
| **Valuations** | 7 | Company snapshot, fair value range, reverse DCF, stock comparison, CAGR matrix |
| **Portfolio Analytics** | 2 | MPT optimization (Max Sharpe / Min Variance), risk decomposition (VaR, CVaR) |
| **Portfolio Management** | 6 | Create/list/delete stock lists, add/remove symbols, watchlist toggle |

### Portfolio Management (new)
Manage your stock lists, watchlists, and portfolio lists without the UI:
- `list_user_stock_lists` — list all your lists with symbols and counts
- `create_user_stock_list` — create a stock list, watchlist, or portfolio list
- `add_symbols_to_user_list` / `remove_symbols_from_user_list` — manage symbols
- `set_user_list_watched` — toggle watchlist tracking
- `delete_user_stock_list` — delete a non-system list

## Skills

The `skills/` folder contains reusable prompt/workflow guides:

- [Stock Evaluation](skills/stock-evaluation.md)
- [Portfolio Optimization](skills/portfolio-optimization.md)
- [Portfolio Self-Evaluation](skills/portfolio-self-evaluation.md)
- [Portfolio Tracking](skills/portfolio-tracking.md) — manage lists + optimize together
- [Earnings Research](skills/earnings-research.md)

## Examples

The `examples/` folder contains lighter-weight copy/paste prompts:

- [Portfolio Optimizer](examples/portfolio-optimizer.md)
- [Earnings Research](examples/earnings-research.md)
- [Sector Screener](examples/sector-screener.md)

## Sample apps

### `samples/mag7-dashboard-nextjs`

A public Next.js sample app that compares the Magnificent 7 using live EvidInvest MCP data.

It is meant to show how a developer can:
- connect to the hosted EvidInvest MCP gateway
- use a real MCP API key
- render a useful stock-comparison UI locally
- build demo/social artifacts from a real sample app instead of mock marketing copy

See the sample README for local setup instructions.

## Getting Started

1. Sign up at **https://evidinvest.com/developers** to grab an API key.
   <!-- TODO: replace with `create_account` MCP tool once it ships -->
2. Configure your MCP client to connect to `https://mcp.evidinvest.com/mcp` with `Authorization: Bearer evid_sk_...`, or use the npm proxy package `@evidinvest/mcp-server`.
3. New accounts include a free monthly tool-call allowance — top up with credits when you need more (see below).

## Credits & Pricing

EvidInvest MCP uses a credit system: every tool call deducts one credit from your account.

- **Free tier** — every account gets a monthly free allowance to try MCP without paying.
- **Top-up tiers** (one-time purchases, credits never expire):
  - **100 credits** — $5
  - **500 credits** — $19
  - **2,000 credits** — $59

Manage your balance and top up at **https://evidinvest.com/developers**.

If a tool call returns a `payment required` error, your balance is at zero — top up or wait for next month's free refresh.

## License

MIT — see [LICENSE](LICENSE)
