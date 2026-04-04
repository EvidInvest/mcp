# Portfolio Self-Evaluation Skill

Use this to evaluate your current holdings — are you overweight risky stocks?
Underexposed to value? Here is how to get an honest assessment.

## Example Prompt
---
Evaluate my current portfolio:
- NVDA: 30% weight
- TSLA: 20% weight
- AAPL: 15% weight
- MSFT: 15% weight
- Cash: 20%

For each stock:
1. get_dcf_valuation and margin_of_safety — am I overpaying?
2. get_peg_ratio — is the growth priced in?
3. get_price_history_with_volatility for 1 year — what is the 30-day rolling vol?

Then:
4. run get_mpt_optimization on the 4 stocks — what weights does the math suggest?
5. How does my current allocation compare to the optimal? Where am I taking unnecessary risk?
6. Give me a rebalancing recommendation.
---

## What Good Looks Like
After running this, you will know:
- Which positions are overvalued vs undervalued
- Whether you are taking more risk than the Sharpe-optimal allocation suggests
- Concrete rebalancing steps with expected improvement in risk-adjusted return
