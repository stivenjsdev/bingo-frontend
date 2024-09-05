export function getBingoLetter(number: number): string {
  const letters = ["b", "i", "n", "g", "o"];
  if (number < 1 || number > 75) {
    return "Número fuera de rango";
  }
  return letters[Math.floor((number - 1) / 15)];
}
