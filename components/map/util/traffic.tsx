export const getCongestionColor = (value: number) => {
  if (value > 70) return "#ff4d4f";
  if (value > 40) return "#faad14";
  return "#52c41a";
};

export const getCongestionStatus = (value: number) => {
  if (value > 70) return "HEAVY";
  if (value > 40) return "MODERATE";
  return "SMOOTH";
};