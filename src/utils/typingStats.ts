export type TypingRank =
  | "unknown"
  | "unstable"
  | "medium"
  | "high";

export type TypingStat = {
  jp: string;
  missCount: number;
  elapsedMs: number;
  typedLength: number;
  completedAt: string;
};

export type TypingAnalysis = {
  total: number;
  totalMiss: number;
  averageMiss: number;
  averageSpeed: number;
  rank: TypingRank;
};

const STORAGE_KEY = "typingStats";

export function getTypingStats(): TypingStat[] {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export function saveTypingStat(stat: TypingStat) {
  const prev = getTypingStats();

  const next = [...prev, stat];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(next)
  );
}

export function clearTypingStats() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTypingAnalysis(): TypingAnalysis {
  const stats = getTypingStats();

  if (stats.length === 0) {
    return {
      total: 0,
      totalMiss: 0,
      averageMiss: 0,
      averageSpeed: 0,
      rank: "unknown",
    };
  }

  const totalMiss = stats.reduce(
    (sum, stat) => sum + stat.missCount,
    0
  );

  const totalTypedLength = stats.reduce(
    (sum, stat) => sum + stat.typedLength,
    0
  );

  const totalElapsedMs = stats.reduce(
    (sum, stat) => sum + stat.elapsedMs,
    0
  );

  const averageMiss =
    totalMiss / stats.length;

  const averageSpeed =
    totalElapsedMs > 0
      ? totalTypedLength / (totalElapsedMs / 1000)
      : 0;

  let rank: TypingRank = "unstable";

  if (averageSpeed >= 5 && averageMiss <= 2) {
  rank = "high";
} else if (
  averageSpeed >= 2 &&
  averageMiss <= 6
) {
  rank = "medium";
}

  return {
    total: stats.length,
    totalMiss,
    averageMiss,
    averageSpeed,
    rank,
  };
}