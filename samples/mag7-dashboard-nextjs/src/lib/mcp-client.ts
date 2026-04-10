import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const MAG7 = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA"];

export interface StockData {
  symbol: string;
  name: string;
  sector: string;
  marketCap: number | null;
  pe: number | null;
  forwardPe: number | null;
  pegRatio: number | null;
  fairValue: number | null;
  currentPrice: number | null;
  marginOfSafety: number | null;
  revenueGrowth: number | null;
  recommendation: string | null;
}

export interface DashboardData {
  stocks: StockData[];
  portfolio: {
    weights: Record<string, number>;
    sharpe: number | null;
    expectedReturn: number | null;
    volatility: number | null;
  } | null;
  fetchedAt: string;
}

async function createMcpClient(): Promise<Client> {
  const apiKey = process.env.EVIDINVEST_API_KEY;
  if (!apiKey || apiKey === "your-api-key-here") {
    throw new Error("EVIDINVEST_API_KEY not configured");
  }

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@evidinvest/mcp"],
    env: { ...process.env, EVIDINVEST_API_KEY: apiKey } as Record<
      string,
      string
    >,
  });

  const client = new Client({ name: "mag7-dashboard", version: "0.1.0" });
  await client.connect(transport);
  return client;
}

async function callTool(
  client: Client,
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  const result = await client.callTool({ name, arguments: args });
  if (result.content && Array.isArray(result.content) && result.content[0]) {
    const first = result.content[0];
    if ("text" in first && typeof first.text === "string") {
      try {
        return JSON.parse(first.text);
      } catch {
        return first.text;
      }
    }
  }
  return result.content;
}

export async function fetchMag7Data(): Promise<DashboardData> {
  const client = await createMcpClient();

  try {
    // Fetch data for all Mag7 stocks in parallel
    const [profiles, valuations, peRatios, mpt] = await Promise.all([
      // Company profiles
      Promise.all(
        MAG7.map((s) =>
          callTool(client, "get_company_profile", { symbol: s }).catch(
            () => null
          )
        )
      ),
      // DCF valuations
      Promise.all(
        MAG7.map((s) =>
          callTool(client, "get_dcf_valuation", { symbol: s }).catch(
            () => null
          )
        )
      ),
      // PE ratios
      Promise.all(
        MAG7.map((s) =>
          callTool(client, "get_pe_ratios", { symbol: s }).catch(() => null)
        )
      ),
      // MPT optimization
      callTool(client, "get_mpt_optimization", {
        symbols: MAG7,
        lookback_days: 252,
      }).catch(() => null),
    ]);

    const stocks: StockData[] = MAG7.map((symbol, i) => {
      const profile = profiles[i] as Record<string, unknown> | null;
      const dcf = valuations[i] as Record<string, unknown> | null;
      const pe = peRatios[i] as Record<string, unknown> | null;

      return {
        symbol,
        name: (profile?.companyName as string) ?? (profile?.name as string) ?? symbol,
        sector: (profile?.sector as string) ?? "Technology",
        marketCap: (profile?.mktCap as number) ?? (profile?.marketCap as number) ?? null,
        pe: (pe?.pe as number) ?? (pe?.trailingPE as number) ?? null,
        forwardPe: (pe?.forwardPE as number) ?? null,
        pegRatio: (dcf?.pegRatio as number) ?? null,
        fairValue: (dcf?.fairValue as number) ?? (dcf?.dcf as number) ?? null,
        currentPrice: (dcf?.currentPrice as number) ?? (dcf?.price as number) ?? (profile?.price as number) ?? null,
        marginOfSafety: (dcf?.marginOfSafety as number) ?? (dcf?.upside as number) ?? null,
        revenueGrowth: (profile?.revenueGrowth as number) ?? null,
        recommendation: null,
      };
    });

    // Build portfolio data from MPT result
    let portfolio: DashboardData["portfolio"] = null;
    if (mpt && typeof mpt === "object") {
      const m = mpt as Record<string, unknown>;
      portfolio = {
        weights: (m.weights as Record<string, number>) ?? {},
        sharpe: (m.sharpe as number) ?? (m.sharpeRatio as number) ?? null,
        expectedReturn: (m.expectedReturn as number) ?? null,
        volatility: (m.volatility as number) ?? null,
      };
    }

    return {
      stocks,
      portfolio,
      fetchedAt: new Date().toISOString(),
    };
  } finally {
    await client.close().catch(() => {});
  }
}
