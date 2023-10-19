import { Direction } from '../../../types/direction';
import { bubbleSortTest } from './utils';

describe('Тест сортировки пузырьком:', () => {
  it('Пустой массив по возрастанию отсортирован корректно', () => {
    expect(bubbleSortTest([], Direction.Ascending)).toEqual([]);
  });
  it('Пустой массив по убыванию отсортирован корректно', () => {
    expect(bubbleSortTest([], Direction.Descending)).toEqual([]);
  });
  it('Пустой массив из одного элемента по возрастанию отсортирован корректно', () => {
    expect(bubbleSortTest([666], Direction.Ascending)).toEqual([666]);
  });
  it('Пустой массив из одного элемента по убыванию отсортирован корректно', () => {
    expect(bubbleSortTest([666], Direction.Descending)).toEqual([666]);
  });
  it('Пустой массив из нескольких элементов по возрастанию отсортирован корректно', () => {
    expect(bubbleSortTest([4, 23, 16, 15, 8, 42], Direction.Ascending)).toEqual(
      [4, 8, 15, 16, 23, 42]
    );
  });
  it('Пустой массив из нескольких элементов по убыванию отсортирован корректно', () => {
    expect(
      bubbleSortTest([4, 23, 16, 15, 8, 42], Direction.Descending)
    ).toEqual([42, 23, 16, 15, 8, 4]);
  });
  it('Массив, который уже отсортирован по возрастанию, не должен изменяться', () => {
    const sortedArray = [4, 8, 15, 16, 23, 42];
    const inputArray = [...sortedArray];
    expect(bubbleSortTest(inputArray, Direction.Ascending)).toEqual(sortedArray);
  });
  it('Массив, который уже отсортирован по убыванию, не должен изменяться', () => {
    const sortedArray = [42, 23, 16, 15, 8, 4];
    const inputArray = [...sortedArray];
    expect(bubbleSortTest(inputArray, Direction.Descending)).toEqual(sortedArray);
  });
});
