# Portfolio Optimization Skill

Use MPT (Modern Portfolio Theory) to find the optimal allocation for a set of stocks.

## What it does
The get_mpt_optimization tool runs Max Sharpe ratio optimization:
- Finds the weight combination that maximizes return per unit of risk
- Uses 252 days of historical price data by default
- Respects position limits (default: max 30% per stock)

## Example Prompts

### Basic optimization
---
I want to optimize my portfolio across these stocks: AAPL, MSFT, NVDA, GOOGL, META, JPM, JNJ, KO

1. Run MPT optimization with 1-year lookback
2. Show me the optimal weights and expected Sharpe ratio
3. What is the expected annual return and volatility?
4. Which stocks did the optimizer exclude and why?
---

### Rebalancing sweep (find optimal frequency)
---
I want to find the optimal rebalancing frequency for my portfolio: AAPL, MSFT, NVDA, GOOGL, META

Run get_mpt_optimization with these lookback periods:
- 63 days (quarterly)
- 126 days (semi-annual)
- 252 days (annual)

Compare the Sharpe ratio for each. Which rebalancing frequency is best?
---

### Sector comparison
---
Compare MPT optimization across three universes:
1. Tech: AAPL, MSFT, NVDA, GOOGL, META
2. Healthcare: JNJ, PFE, ABBV, UNH, TMO
3. Mixed: AAPL, JNJ, JPM, KO, XOM

For each universe: run get_mpt_optimization and report CAGR, Sharpe ratio, and final weights.
Which universe produces the best risk-adjusted returns?
---
