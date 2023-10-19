import { getFibonacciNumbers } from './utils';

describe('Тестирование алгоритма фибоначчи', () => {
  it('Возвращает пустой массив при отсутствии аргумента', () => {
    const res = getFibonacciNumbers();
    expect(res).toStrictEqual([]);
  });

  it('Возвращает пустой массив для отрицательного числа', () => {
    const number = -5;
    const res = getFibonacciNumbers(number);
    expect(res).toStrictEqual([]);
  });

  it('Возвращает последовательность Фибоначчи для положительного числа', () => {
    const number = 5;
    const res = getFibonacciNumbers(number);
    expect(res).toStrictEqual([1, 1, 2, 3, 5, 8]);
  });
});
