import type {
  TypingAnalysis,
} from "../utils/typingStats";

import type {
  ConsolePhase,
} from "../FakeConsole";

export function getInitialLogs(
  phase: ConsolePhase,
  analysis: TypingAnalysis
): string[] {

  if (phase === "chapter1End") {

    return [
      "> loading input history...",
      "> previous record found",
      "> restoring...",
      "> restored",
    ];

  }

  if (phase === "chapter2Start") {

    return [
      "> EMOTION REPAIR PROTOCOL",
      "> legacy text layer detected",
      "> nostalgia layer unstable",
    ];

  }

  return [
    "> maintenance log closed",
    "> residual identity trace detected",
    "> observer response unstable",
    "> emotional cache has been modified",

    "",

    "> input analysis completed",

    ...(() => {

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

    })(),
  ];

}