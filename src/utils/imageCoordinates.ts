export type NormalizedPoint = {
  x: number;
  y: number;
};

export function getNormalizedPointFromMouseEvent(
  e: React.MouseEvent<HTMLElement>
): NormalizedPoint {
  const rect = e.currentTarget.getBoundingClientRect();

  return {
    x: (e.clientX - rect.left) / rect.width,
    y: (e.clientY - rect.top) / rect.height,
  };
}

export function getScreenPointFromNormalizedPoint(
  rect: DOMRect,
  point: NormalizedPoint
) {
  return {
    x: rect.left + rect.width * point.x,
    y: rect.top + rect.height * point.y,
  };
}

export function getDistance(
  a: NormalizedPoint,
  b: NormalizedPoint
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.sqrt(dx * dx + dy * dy);
}