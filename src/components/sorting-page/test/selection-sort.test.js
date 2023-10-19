import { Direction } from '../../../types/direction';
import { selectionSortTest } from './utils';

describe('Тест сортировки выбором:', () => {
  it('Пустой массив по возрастанию отсортирован корректно', () => {
    expect(selectionSortTest([], Direction.Ascending)).toEqual([]);
  });
  it('Пустой массив по убыванию отсортирован корректно', () => {
    expect(selectionSortTest([], Direction.Descending)).toEqual([]);
  });
  it('Пустой массив из одного элемента по возрастанию отсортирован корректно', () => {
    expect(selectionSortTest([666], Direction.Ascending)).toEqual([666]);
  });
  it('Пустой массив из одного элемента по убыванию отсортирован корректно', () => {
    expect(selectionSortTest([666], Direction.Descending)).toEqual([666]);
  });
  it('Пустой массив из нескольких элементов по возрастанию отсортирован корректно', () => {
    expect(
      selectionSortTest([4, 23, 16, 15, 8, 42], Direction.Ascending)
    ).toEqual([4, 8, 15, 16, 23, 42]);
  });
  it('Пустой массив из нескольких элементов по убыванию отсортирован корректно', () => {
    expect(
      selectionSortTest([4, 23, 16, 15, 8, 42], Direction.Descending)
    ).toEqual([42, 23, 16, 15, 8, 4]);
  });
});
