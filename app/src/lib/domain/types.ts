/**
 * Domain model for the analysis workspace. The Analysis is the central object;
 * Ledger, history, and portfolios all derive from the analyses collection.
 * See DATA_MODEL.md at the repo root for the full rationale.
 */
import type { Vertical, AssetParameters, DebateLine, AdvisoryLens } from "@/data/presets";

export type { Vertical, AssetParameters, DebateLine, AdvisoryLens };

/** Red-team debate output (seeded from a preset now; produced by the AI in P4). */
export interface DebateResult {
  confidence: number;
  bull: DebateLine[];
  bear: DebateLine[];
}

/** The three advisory lenses (seeded now; produced by the AI in P4). */
export interface AdvisoryResult {
  operator: AdvisoryLens;
  risk: AdvisoryLens;
  predator: AdvisoryLens;
}

export type DecisionAction = "APPROVE" | "HOLD" | "REJECT";
export type AnalysisStatus = "draft" | "decided" | "watching" | "archived";

export interface AssetMeta {
  ticker?: string;
  sector?: string;
  currency?: string; // default "IDR"
  region?: string;
  dataAsOf?: string;
  source?: string;
}

/** A single deterministic figure — the engine output in serializable, prompt-ready form. */
export interface Metric {
  key: string;
  label: string;
  value: number;
  display: string;
  verdict?: string;
}

export interface ComputedMetrics {
  vertical: Vertical;
  metrics: Metric[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** First assistant turn is the grounded red-team debate. */
  kind?: "debate" | "answer";
  /** Ids of other analyses pulled in as context (composition). */
  contextRefs?: string[];
  createdAt: number;
}

export interface Decision {
  action: DecisionAction;
  rationale: string;
  decidedAt: number;
}

/**
 * Droppable context. Files (PDF/image) are native Claude content blocks; links and
 * web research use Anthropic's server-side web_fetch / web_search tools.
 */
export type ContextSource =
  | {
      id: string;
      kind: "file";
      name: string;
      mime: string;
      fileKind: "image" | "pdf";
      blobId: string;
      extractedText?: string;
      createdAt: number;
    }
  | {
      id: string;
      kind: "link";
      url: string;
      title?: string;
      createdAt: number;
    };

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: number;
}

export interface Analysis {
  id: string;
  title: string;
  vertical: Vertical;
  assetName: string;
  assetMeta: AssetMeta;
  tags: string[];
  folderId: string | null;
  parameters: AssetParameters;
  metrics: ComputedMetrics;
  debate: DebateResult | null;
  advisory: AdvisoryResult | null;
  sources: ContextSource[];
  allowWebSearch: boolean;
  chat: ChatMessage[];
  decision: Decision | null;
  model: string;
  status: AnalysisStatus;
  createdAt: number;
  updatedAt: number;
}

export interface PortfolioAnalysis {
  id: string;
  title: string;
  memberIds: string[];
  tags: string[];
  folderId: string | null;
  chat: ChatMessage[];
  allowWebSearch: boolean;
  createdAt: number;
  updatedAt: number;
}
