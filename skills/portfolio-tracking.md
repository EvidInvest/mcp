# Portfolio Tracking Skill

Use the stock list management tools together with portfolio optimization and valuation
to build, track, and rebalance a portfolio — all through natural language.

## What it does

1. **Create a portfolio list** to track your holdings
2. **Add/remove symbols** as your portfolio changes
3. **Run MPT optimization** on the list to find optimal weights
4. **Get fair values** for each position to find rebalance candidates

## Example Prompts

### Build and optimize a new portfolio
---
1. Create a portfolio list called "Tech Core" with these stocks: AAPL, MSFT, NVDA, GOOGL, META, AMZN
2. Run MPT Max Sharpe optimization on those symbols
3. For each stock, get the fair value range
4. Which stocks are undervalued relative to the optimal weight the optimizer suggests?
---

### Review an existing portfolio list
---
1. List my stock lists and find my portfolio lists
2. For the portfolio list named "Growth", get the current symbols
3. Run portfolio risk decomposition on those symbols with equal weights
4. Which positions contribute the most to portfolio VaR?
5. Get the CAGR matrix for the top 3 risk contributors — are they growing fast enough to justify the risk?
---

### Rebalance workflow
---
1. List my portfolio lists
2. For my "Dividend Income" portfolio, get all the symbols
3. Run MPT optimization (Max Sharpe) on those symbols
4. For each symbol, get the dividend history and DCF valuation
5. Compare current allocation to optimal weights
6. Suggest which positions to trim and which to add to, considering both valuation and yield
---

### Watchlist to portfolio pipeline
---
1. List my watchlists
2. For my watchlist "Earnings Watch", get all the symbols
3. Run compare_stocks on all of them — which are cheapest on PE and PEG?
4. For the top 3 cheapest, get the fair value range
5. Create a new portfolio list called "Earnings Picks Q2" and add those 3 stocks
6. Run MPT optimization to get suggested weights
---

### Add a new position and re-optimize
---
1. Add COST and TGT to my "Consumer Staples" portfolio list
2. Get the current symbols in that list
3. Run MPT optimization on the full updated list
4. How do the optimal weights change with the new additions?
5. Run portfolio risk decomposition — does adding these reduce or increase portfolio VaR?
---

## Tools used

| Tool | Purpose |
|------|---------|
| `list_user_stock_lists` | See all your lists and their contents |
| `create_user_stock_list` | Create a new portfolio/watchlist |
| `add_symbols_to_user_list` | Add stocks to a list |
| `remove_symbols_from_user_list` | Remove stocks from a list |
| `set_user_list_watched` | Enable watchlist tracking |
| `optimize_portfolio` | MPT optimization for weights |
| `portfolio_risk_decomposition` | Risk analysis per position |
| `get_fair_value_range` | Multi-model fair value |
| `get_dcf_valuation` | DCF intrinsic value |
| `compare_stocks` | Side-by-side comparison |
