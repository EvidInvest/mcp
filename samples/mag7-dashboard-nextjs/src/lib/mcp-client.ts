import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const MAG7 = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA"] as const;
const MCP_URL = process.env.EVIDINVEST_MCP_URL || "https://36dpjzesa7.us-east-1.awsapprunner.com/mcp";

export type StockData = {
  symbol: string;
  name: string;
  sector: string | null;
  marketCap: number | null;
  currentPrice: number | null;
  fairValue: number | null;
  baseFairValue: number | null;
  bullFairValue: number | null;
  bearFairValue: number | null;
  pe: number | null;
  forwardPe?: number | null;
  marginOfSafety: number | null;
  upsidePct: number | null;
};

export type DashboardData = {
  stocks: StockData[];
  setupRequired?: boolean;
  message?: string;
  fetchedAt: string;
  portfolio?: {
    weights: Record<string, number>;
    sharpe?: number | null;
    sharpeRatio?: number | null;
    expectedReturn?: number | null;
    expected_return?: number | null;
    volatility?: number | null;
    expectedVolatility?: number | null;
  } | null;
  source: {
    transport: "streamable-http";
    endpoint: string;
  };
};

type ToolResult = {
  content?: Array<{ type: string; text?: string }>;
};

function parseToolJson(result: ToolResult): any {
  const text = result.content?.find((item) => item.type === "text")?.text;
  if (!text) throw new Error("MCP tool returned no text content");
  return JSON.parse(text);
}

function toNum(value: unknown): number | null {
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function callTool(client: Client, name: string, args: Record<string, unknown>) {
  return client.callTool({ name, arguments: args });
}

async function fetchStock(client: Client, symbol: string): Promise<StockData> {
  const [profileRaw, fairValueRaw, peRaw] = await Promise.all([
    callTool(client, "get_company_profile", { symbol }),
    callTool(client, "get_fair_value_range", { symbol }),
    callTool(client, "get_pe_ratios", { symbol, period: "both", limit: 1 }),
  ]);

  const profile = parseToolJson(profileRaw as ToolResult);
  const fairValue = parseToolJson(fairValueRaw as ToolResult);
  const pe = parseToolJson(peRaw as ToolResult);
  const latestPe = Array.isArray(pe.data) && pe.data.length > 0 ? pe.data[0] : null;

  const range = fairValue.fair_value_range ?? {};

  return {
    symbol,
    name: profile.company_name ?? symbol,
    sector: profile.sector ?? null,
    marketCap: toNum(profile.market_cap),
    currentPrice: toNum(profile.price),
    fairValue: toNum(range.base_case),
    baseFairValue: toNum(range.base_case),
    bullFairValue: toNum(range.bull_case),
    bearFairValue: toNum(range.bear_case),
    pe: toNum(latestPe?.diluted_pe_ratio ?? latestPe?.basic_pe_ratio ?? pe.analysis?.current_pe),
    marginOfSafety: null,
    upsidePct: toNum((fairValue.upside_pct ?? "").toString().replace("%", "")),
  };
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const apiKey = process.env.EVIDINVEST_API_KEY;

  if (!apiKey) {
    return {
      stocks: [],
      setupRequired: true,
      message: "Missing EVIDINVEST_API_KEY",
      fetchedAt: new Date().toISOString(),
      portfolio: null,
      source: { transport: "streamable-http", endpoint: MCP_URL },
    };
  }

  const client = new Client({ name: "mag7-dashboard-nextjs", version: "0.1.0" });
  const transport = new StreamableHTTPClientTransport(new URL(MCP_URL), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  });

  try {
    await client.connect(transport);
    const stocks = await Promise.all(MAG7.map((symbol) => fetchStock(client, symbol)));

    return {
      stocks,
      fetchedAt: new Date().toISOString(),
      portfolio: null,
      source: { transport: "streamable-http", endpoint: MCP_URL },
    };
  } catch (error) {
    return {
      stocks: [],
      setupRequired: true,
      message: error instanceof Error ? error.message : "Unknown MCP error",
      fetchedAt: new Date().toISOString(),
      portfolio: null,
      source: { transport: "streamable-http", endpoint: MCP_URL },
    };
  } finally {
    await client.close().catch(() => undefined);
  }
}
