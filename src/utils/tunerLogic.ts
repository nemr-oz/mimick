import type { Point } from "./tunerMath";

export type TunerState = {
  normalized: number;
  closeness: number;
  message: string;
  isStable: boolean;
};

export function getTunerState(
  cursor: Point,
  target: Point
): TunerState {
  const dx = cursor.x - target.x;
  const dy = cursor.y - target.y;

  const distance = Math.sqrt(
    dx * dx + dy * dy
  );

  const normalized =
    Math.min(distance / 0.42, 1);

  const closeness =
    1 - normalized;

  let message =
    "> stabilize emotional waveform";

  if (closeness > 0.88) {
    message =
      "> stable emotional waveform detected";
  } else if (closeness > 0.66) {
    message =
      "> emotional residue responding";
  } else if (closeness > 0.38) {
    message =
      "> waveform partially aligned";
  }

  return {
    normalized,
    closeness,
    message,
    isStable: closeness > 0.88,
  };
}