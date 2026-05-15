export type Point = {
  x: number;
  y: number;
};

export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function getRelativePoint(
  clientX: number,
  clientY: number,
  rect: DOMRect
): Point {
  return {
    x: clamp01((clientX - rect.left) / rect.width),
    y: clamp01((clientY - rect.top) / rect.height),
  };
}

export function getCloseness(
  cursor: Point,
  target: Point,
  radius = 0.42
) {
  const dx = cursor.x - target.x;
  const dy = cursor.y - target.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const normalized = Math.min(distance / radius, 1);

  return {
    distance,
    normalized,
    closeness: 1 - normalized,
  };
}