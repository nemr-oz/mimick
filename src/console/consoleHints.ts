import type {
  TypingRank,
} from "../utils/typingStats";

export function getHintLogs(
  rank: TypingRank
) {

  if (rank === "high") {

    return [
      "> hidden command unlocked",
      "> command : memory",
      "> archived layer accessible",
    ];

  }

  if (rank === "medium") {

    return [
      "> hidden command unlocked",
      "> command : observer",
      "> partial observer log restored",
    ];

  }

  return [
    "> hidden command unstable",
    "> synchronization insufficient",
    "> returning to initial loop",
  ];

}