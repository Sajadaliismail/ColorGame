export function generateColors(level: number): {
  mainColor: string;
  oddColor: string;
} {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.max(20, 100 - level);
  const lightness = 50;
  const mainColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const oddHueDiff = Math.max(1, Math.floor(15 / Math.sqrt(level)));
  const oddHue = (hue + oddHueDiff) % 360;
  const oddColor = `hsl(${oddHue}, ${saturation}%, ${lightness}%)`;

  return { mainColor, oddColor };
}
