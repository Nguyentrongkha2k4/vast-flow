export default function calculateCongestion(speed: number, count: number): number {
  if (count === 0) return 0;

  // ví dụ đơn giản:
  // speed thấp + count cao = tắc
  const maxSpeed = 60; // giả định
  const densityFactor = Math.min(count / 50, 1); // normalize

  const congestion = (1 - speed / maxSpeed) * 0.6 + densityFactor * 0.4;

  return Math.min(Math.max(congestion, 0), 1); // clamp 0 → 1
}