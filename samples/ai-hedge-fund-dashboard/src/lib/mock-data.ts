export interface Position {
  ticker: string;
  name: string;
  sector: string;
  currentPrice: number;
  fairValue: number;
  bearCase: number;
  bullCase: number;
  upsidePercent: number;
  verdict: "Undervalued" | "Fairly Valued" | "Overvalued";
  weight: number;
  shares: number;
  marketCap: string;
  peTrailing: number;
  peForward: number;
}

export interface OptimizationResult {
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  weights: Record<string, number>;
  excludedTickers: { ticker: string; reason: string }[];
}

export interface RiskDecomposition {
  portfolioVar95: number;
  portfolioCVar95: number;
  diversificationRatio: number;
  marginalContributions: {
    ticker: string;
    weight: number;
    marginalVar: number;
    percentContribution: number;
  }[];
}

export interface EarningsEvent {
  ticker: string;
  name: string;
  date: string;
  time: "BMO" | "AMC" | "TBD";
  epsEstimate: number;
  epsActual: number | null;
  revEstimate: string;
  revActual: string | null;
  surprise: number | null;
  status: "upcoming" | "beat" | "miss" | "inline";
}

export const PORTFOLIO_VALUE = 50_000_000;

export const positions: Position[] = [
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Semiconductors",
    currentPrice: 131.29,
    fairValue: 152.0,
    bearCase: 98.0,
    bullCase: 210.0,
    upsidePercent: 15.8,
    verdict: "Undervalued",
    weight: 0.2,
    shares: 76_300,
    marketCap: "$3.21T",
    peTrailing: 52.4,
    peForward: 29.1,
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    sector: "Semiconductors",
    currentPrice: 104.81,
    fairValue: 125.0,
    bearCase: 72.0,
    bullCase: 175.0,
    upsidePercent: 19.3,
    verdict: "Undervalued",
    weight: 0.15,
    shares: 71_560,
    marketCap: "$170B",
    peTrailing: 95.2,
    peForward: 23.8,
  },
  {
    ticker: "AVGO",
    name: "Broadcom Inc.",
    sector: "Semiconductors",
    currentPrice: 222.19,
    fairValue: 210.0,
    bearCase: 155.0,
    bullCase: 280.0,
    upsidePercent: -5.5,
    verdict: "Fairly Valued",
    weight: 0.125,
    shares: 28_130,
    marketCap: "$1.04T",
    peTrailing: 88.7,
    peForward: 28.5,
  },
  {
    ticker: "TSM",
    name: "Taiwan Semiconductor",
    sector: "Semiconductors",
    currentPrice: 175.43,
    fairValue: 195.0,
    bearCase: 130.0,
    bullCase: 245.0,
    upsidePercent: 11.2,
    verdict: "Undervalued",
    weight: 0.125,
    shares: 35_620,
    marketCap: "$907B",
    peTrailing: 27.3,
    peForward: 20.1,
  },
  {
    ticker: "ASML",
    name: "ASML Holding NV",
    sector: "Semiconductor Equipment",
    currentPrice: 722.51,
    fairValue: 810.0,
    bearCase: 550.0,
    bullCase: 1050.0,
    upsidePercent: 12.1,
    verdict: "Undervalued",
    weight: 0.1,
    shares: 6_920,
    marketCap: "$284B",
    peTrailing: 33.1,
    peForward: 27.4,
  },
  {
    ticker: "MRVL",
    name: "Marvell Technology",
    sector: "Semiconductors",
    currentPrice: 71.85,
    fairValue: 85.0,
    bearCase: 48.0,
    bullCase: 115.0,
    upsidePercent: 18.3,
    verdict: "Undervalued",
    weight: 0.1,
    shares: 69_590,
    marketCap: "$62B",
    peTrailing: 215.0,
    peForward: 30.2,
  },
  {
    ticker: "INTC",
    name: "Intel Corporation",
    sector: "Semiconductors",
    currentPrice: 20.69,
    fairValue: 18.0,
    bearCase: 12.0,
    bullCase: 28.0,
    upsidePercent: -13.0,
    verdict: "Overvalued",
    weight: 0.1,
    shares: 241_660,
    marketCap: "$89B",
    peTrailing: -5.2,
    peForward: 42.1,
  },
  {
    ticker: "SMCI",
    name: "Super Micro Computer",
    sector: "IT Hardware",
    currentPrice: 35.14,
    fairValue: 42.0,
    bearCase: 18.0,
    bullCase: 65.0,
    upsidePercent: 19.5,
    verdict: "Undervalued",
    weight: 0.1,
    shares: 142_290,
    marketCap: "$21B",
    peTrailing: 14.8,
    peForward: 10.2,
  },
];

export const optimization: OptimizationResult = {
  expectedReturn: 0.284,
  volatility: 0.312,
  sharpeRatio: 1.42,
  weights: {
    NVDA: 0.32,
    AMD: 0.18,
    AVGO: 0.08,
    TSM: 0.2,
    ASML: 0.1,
    MRVL: 0.12,
    INTC: 0.0,
    SMCI: 0.0,
  },
  excludedTickers: [
    {
      ticker: "INTC",
      reason:
        "Negative expected return with high volatility. Removing improves Sharpe by 0.18.",
    },
    {
      ticker: "SMCI",
      reason:
        "Extreme idiosyncratic volatility (audit concerns, delisting risk). Correlated upside captured through NVDA/AMD exposure.",
    },
  ],
};

export const risk: RiskDecomposition = {
  portfolioVar95: 0.0342,
  portfolioCVar95: 0.0518,
  diversificationRatio: 1.47,
  marginalContributions: [
    {
      ticker: "NVDA",
      weight: 0.2,
      marginalVar: 0.0089,
      percentContribution: 26.0,
    },
    {
      ticker: "AMD",
      weight: 0.15,
      marginalVar: 0.0072,
      percentContribution: 21.1,
    },
    {
      ticker: "AVGO",
      weight: 0.125,
      marginalVar: 0.0041,
      percentContribution: 12.0,
    },
    {
      ticker: "TSM",
      weight: 0.125,
      marginalVar: 0.0038,
      percentContribution: 11.1,
    },
    {
      ticker: "ASML",
      weight: 0.1,
      marginalVar: 0.0031,
      percentContribution: 9.1,
    },
    {
      ticker: "MRVL",
      weight: 0.1,
      marginalVar: 0.0035,
      percentContribution: 10.2,
    },
    {
      ticker: "INTC",
      weight: 0.1,
      marginalVar: 0.0022,
      percentContribution: 6.4,
    },
    {
      ticker: "SMCI",
      weight: 0.1,
      marginalVar: 0.0014,
      percentContribution: 4.1,
    },
  ],
};

export const earnings: EarningsEvent[] = [
  {
    ticker: "TSM",
    name: "Taiwan Semiconductor",
    date: "2026-04-17",
    time: "BMO",
    epsEstimate: 2.05,
    epsActual: 2.12,
    revEstimate: "$25.4B",
    revActual: "$25.8B",
    surprise: 3.4,
    status: "beat",
  },
  {
    ticker: "ASML",
    name: "ASML Holding",
    date: "2026-04-16",
    time: "BMO",
    epsEstimate: 6.22,
    epsActual: 6.75,
    revEstimate: "$8.1B",
    revActual: "$8.5B",
    surprise: 8.5,
    status: "beat",
  },
  {
    ticker: "INTC",
    name: "Intel Corporation",
    date: "2026-04-24",
    time: "AMC",
    epsEstimate: 0.01,
    epsActual: -0.02,
    revEstimate: "$12.3B",
    revActual: "$12.1B",
    surprise: -300.0,
    status: "miss",
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    date: "2026-05-06",
    time: "AMC",
    epsEstimate: 0.94,
    epsActual: null,
    revEstimate: "$7.1B",
    revActual: null,
    surprise: null,
    status: "upcoming",
  },
  {
    ticker: "SMCI",
    name: "Super Micro Computer",
    date: "2026-05-06",
    time: "AMC",
    epsEstimate: 0.48,
    epsActual: null,
    revEstimate: "$5.6B",
    revActual: null,
    surprise: null,
    status: "upcoming",
  },
  {
    ticker: "AVGO",
    name: "Broadcom Inc.",
    date: "2026-06-05",
    time: "AMC",
    epsEstimate: 1.52,
    epsActual: null,
    revEstimate: "$15.2B",
    revActual: null,
    surprise: null,
    status: "upcoming",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    date: "2026-05-28",
    time: "AMC",
    epsEstimate: 0.88,
    epsActual: null,
    revEstimate: "$43.3B",
    revActual: null,
    surprise: null,
    status: "upcoming",
  },
  {
    ticker: "MRVL",
    name: "Marvell Technology",
    date: "2026-05-29",
    time: "AMC",
    epsEstimate: 0.62,
    epsActual: null,
    revEstimate: "$1.9B",
    revActual: null,
    surprise: null,
    status: "upcoming",
  },
];
