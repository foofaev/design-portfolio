// modulo that supports negative numbers (so that e.g. -5 % 4 = 3)
const modulo = (a: number, n: number): number => ((a % n) + n) % n;

export default modulo;
