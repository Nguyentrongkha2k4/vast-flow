export default function calculateCongestion(
  speed: number,
  count: number
): number {

  if (count <= 0) return 0;

  // ===== CONFIG HCM =====
  const MAX_SPEED = 45;     // nội thành bình thường
  const MAX_COUNT = 80;     // mật độ cao đô thị

  // ===== SPEED FACTOR =====
  // 0 = thông thoáng
  // 1 = đứng yên
  let speedFactor = 1 - Math.min(speed / MAX_SPEED, 1);

  // tăng mạnh khi speed thấp
  speedFactor = Math.pow(speedFactor, 1.7);

  // ===== DENSITY FACTOR =====
  let densityFactor = Math.min(count / MAX_COUNT, 1);

  // density ít quan trọng hơn speed
  densityFactor = Math.pow(densityFactor, 1.2);

  // ===== FINAL SCORE =====
  const congestion =
    speedFactor * 0.75 +
    densityFactor * 0.25;

  // clamp 0 → 1
  return Math.min(Math.max(congestion, 0), 1)*100;
}