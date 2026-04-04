# Stock Evaluation Skill

Use this skill to evaluate whether a stock is worth buying at its current price.

## Evaluation Checklist
Ask your AI agent to run through these steps:

### Step 1: Get the fundamentals
```
get_company_profile("SYMBOL")
get_income_statement("SYMBOL")
get_balance_sheet("SYMBOL")
get_cash_flow("SYMBOL")
```

### Step 2: Calculate fair value
```
get_dcf_valuation("SYMBOL")
get_fair_value_range("SYMBOL")
get_margin_of_safety("SYMBOL", current_price)
```

### Step 3: Check growth and valuation ratios
```
get_growth_rates("SYMBOL")
get_peg_ratio("SYMBOL")
get_pe_ratios("SYMBOL")
```

### Step 4: Compare to peers
```
compare_stocks(["SYMBOL", "PEER1", "PEER2"])
```

### Step 5: Check upcoming catalysts
```
get_earnings_calendar()  # Is earnings coming up?
```

## Example Evaluation Prompt
Paste this into Claude Desktop with EvidInvest MCP connected:

---
Evaluate NVDA as a potential investment:

1. Get the DCF fair value and margin of safety
2. Get the PEG ratio and compare it to the semiconductor sector PE
3. Get the 5-year revenue CAGR
4. Get the fair value range (bull/base/bear scenarios)
5. Compare NVDA vs AMD on fair value and growth metrics
6. Based on all this, is NVDA undervalued, fairly valued, or overvalued at the current price?

Give me a buy/hold/sell recommendation with your reasoning.
---
