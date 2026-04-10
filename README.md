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
- **Endpoint:** `https://36dpjzesa7.us-east-1.awsapprunner.com/mcp`
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

EvidInvest MCP exposes valuation, market-data, and portfolio-analysis workflows such as:
- DCF valuation
- fair value ranges
- margin of safety
- PEG / P/E analysis
- earnings research
- stock comparison
- portfolio optimization / MPT

## Skills

The `skills/` folder contains reusable prompt/workflow guides:

- [Stock Evaluation](skills/stock-evaluation.md)
- [Portfolio Optimization](skills/portfolio-optimization.md)
- [Portfolio Self-Evaluation](skills/portfolio-self-evaluation.md)
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

## Pricing

EvidInvest MCP access requires an EvidInvest plan with MCP access.

Sign up at:
- **https://evidinvest.com/developers**

## License

MIT — see [LICENSE](LICENSE)
