# EvidInvest MCP Server

AI-powered financial data tools for Claude, Cursor, and any MCP client.

Connect EvidInvest to your AI agent and get instant access to:
- DCF valuations and fair value estimates
- MPT portfolio optimization
- Price history with rolling volatility
- Earnings calendar and estimates  
- Revenue growth rates and financial ratios
- Industry PE comparisons

## Quick Start

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "evidinvest": {
      "command": "npx",
      "args": ["-y", "@evidinvest/mcp"],
      "env": {
        "EVIDINVEST_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Get your API key at [evidinvest.com/developers](https://evidinvest.com/developers) (Pro subscribers).

## Available Tools (26 total)

### Financial Data
- `get_company_profile` — Company overview, sector, market cap
- `get_income_statement` — Revenue, margins, YoY growth
- `get_balance_sheet` — Assets, debt, equity
- `get_cash_flow` — Operating/free cash flow
- `get_growth_rates` — Revenue and earnings CAGR
- `get_pe_ratios` — PE ratio history and industry comparison
- `get_earnings_estimates` — Consensus EPS and revenue estimates
- `get_price_history_with_volatility` — Daily OHLCV + 30d/90d rolling volatility

### Market Data
- `get_earnings_calendar` — Upcoming earnings dates
- `get_market_overview` — Market indices and sector performance
- `screen_by_valuation` — Filter stocks by PE, PEG, margins, upside

### Valuation
- `get_dcf_valuation` — DCF fair value estimate
- `get_margin_of_safety` — Upside/downside to fair value
- `get_fair_value_range` — Bull/base/bear scenarios
- `get_peg_ratio` — Growth-adjusted valuation
- `compare_stocks` — Side-by-side comparison

### Portfolio & Calculation
- `get_mpt_optimization` — Max Sharpe portfolio weights
- `get_sharpe_ratio` — Risk-adjusted return metric
- `get_revenue_cagr` — Compound annual growth rate

## Example Conversations

### Value a stock
```
You: What is the fair value of NVDA?
Claude: [calls get_dcf_valuation("NVDA")]
→ Fair value: $142, Current: $118, Upside: 20%, Margin of safety: 17%
```

### Optimize a portfolio
```
You: Optimize my portfolio: AAPL, MSFT, GOOGL, NVDA, META
Claude: [calls get_mpt_optimization(["AAPL","MSFT","GOOGL","NVDA","META"], lookback_days=252)]
→ Optimal weights: GOOGL 28%, MSFT 24%, META 22%, AAPL 18%, NVDA 8%
   Expected Sharpe: 1.4 | Expected return: 18.2% | Vol: 19.1%
```

### Screen for value
```
You: Find undervalued US large-caps with strong margins
Claude: [calls screen_by_valuation(pe_max=20, margin_min=25, upside_min=15)]
→ Returns: CSCO, IBM, JNJ, KO... (filtered list with metrics)
```

### Get price history with volatility
```
You: Show me TSLA price history and rolling volatility for 2024
Claude: [calls get_price_history_with_volatility("TSLA", "2024-01-01", "2024-12-31")]
→ Returns daily OHLCV + 30d rolling vol + 90d rolling vol
```

## Use Cases

- **Portfolio optimizer**: Run MPT on any stock universe, find optimal weights
- **Earnings tracker**: Get upcoming earnings + fair value before reports
- **Sector screener**: Filter stocks by fundamentals across any sector
- **Valuation dashboard**: Compare multiple stocks side-by-side
- **Risk monitor**: Track rolling volatility and Sharpe ratios

## Skills & Prompts

The `skills/` folder contains ready-to-use prompt templates for common workflows:

| Skill | Description |
|-------|-------------|
| [Stock Evaluation](skills/stock-evaluation.md) | Full fundamental analysis — DCF, PEG, growth rates, peer comparison |
| [Portfolio Optimization](skills/portfolio-optimization.md) | MPT Max Sharpe optimization with rebalancing and sector comparison |
| [Portfolio Self-Evaluation](skills/portfolio-self-evaluation.md) | Evaluate your current holdings vs the mathematically optimal allocation |
| [Earnings Research](skills/earnings-research.md) | Pre-earnings prep — consensus estimates, fair value scenarios, what to watch |

### Claude Plugin

The [`claude-plugin.json`](claude-plugin.json) file provides a Claude Desktop plugin configuration with built-in prompt templates. It includes four prompts you can invoke directly:

- **evaluate-stock** — Full fundamental evaluation of any stock
- **optimize-portfolio** — MPT portfolio optimization for a set of symbols
- **pre-earnings-research** — Pre-earnings research and scenario analysis
- **portfolio-self-evaluation** — Compare your portfolio to the MPT optimal

## Blog & Tutorials

- [How to Build a Stock Valuation Agent](https://evidinvest.com/blog/mcp-stock-valuation-agent-2026)
- [We Ran MPT on the Top 100 US Stocks](https://evidinvest.com/blog/mpt-portfolio-optimization-2026)
- [15 Years of MPT: Sector vs Diversified](https://evidinvest.com/blog/mpt-sector-backtest-2026)

## Pricing

Available to EvidInvest Pro subscribers. [Get access →](https://evidinvest.com/developers)

## License

MIT — see LICENSE
