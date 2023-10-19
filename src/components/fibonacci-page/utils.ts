// вычисление последовательности до n-го элемента
export const iterativeFibonacci = (n: number) => {
  // инициализирует массив для хранения последовательности Фибоначчи
  let sequence: number[] = [1, 1];
  // если n меньше 3 возвращает первый элемент последовательности
  if (n < 3) return [1];
  // вычисляет последовательность Фибоначчи для всех элементов до n
  for (let i = 2; i <= n; i++) {
    // добавляет новый элемент, равный сумме двух предыдущих
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2]
    );
  }
  // возвращает вычисленную последовательность Фибоначчи
  return sequence;
};

// получение первых n элементов последовательности Фибоначчи
export const getFibonacciNumbers = (number: number) => {
  const arrNumber: number[] = [];
  for (let i = 0; i <= number; i++) {
    if (i === 1 || i === 0) {
      arrNumber.push(1);
    } else {
      arrNumber.push(arrNumber[i - 2] + arrNumber[i - 1]);
    }
  }
  return arrNumber;
};
