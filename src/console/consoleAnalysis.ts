import type {
  TypingAnalysis,
} from "../utils/typingStats";

export function getAnalysisLogs(
  analysis: TypingAnalysis
): string[] {
  if (analysis.rank === "high") {
    return [
      "> reading velocity : high",
      "> correction noise : low",
      "> emotional residue detected",
      "> memory layer available",
    ];
  }

  if (analysis.rank === "medium") {
    return [
      "> reading velocity : stable",
      "> correction noise : moderate",
      "> observer trace detected",
    ];
  }

  return [
    "> reading velocity : unstable",
    "> correction noise : elevated",
    "> synchronization failed",
  ];
}