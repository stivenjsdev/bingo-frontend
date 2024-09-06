export function getBingoLetter(number: number): string {
  const letters = ["b", "i", "n", "g", "o"];
  if (number < 1 || number > 75) {
    // Número fuera de rango
    return "";
  }
  return letters[Math.floor((number - 1) / 15)];
}

const getLetterForNumber = (num: number) => {
  if (num <= 15) return "B";
  if (num <= 30) return "I";
  if (num <= 45) return "N";
  if (num <= 60) return "G";
  return "O";
};

export const organizeNumbers = () => {
  const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
  return allNumbers.reduce((acc, num) => {
    const letter = getLetterForNumber(num);
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(num);
    return acc;
  }, {} as Record<string, number[]>);
};
