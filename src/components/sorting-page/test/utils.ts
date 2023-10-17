import { Direction } from '../../../types/direction';

export const sort = (
  array: Array<number>,
  firstIndex: number,
  secondIndex: number
) => {
  return ([array[firstIndex], array[secondIndex]] = [
    array[secondIndex],
    array[firstIndex],
  ]);
};

export const selectionSortTest = (
  array: Array<number>,
  direction: Direction
) => {
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (
        direction === Direction.Ascending
          ? array[j] < array[minIndex]
          : array[j] > array[minIndex]
      ) {
        minIndex = j;
      }
    }
    sort(array, minIndex, i);
  }
  return array;
};

export const bubbleSortTest = (array: Array<number>, direction: Direction) => {
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (
        direction === Direction.Ascending
          ? array[j] > array[j + 1]
          : array[j] < array[j + 1]
      ) {
        sort(array, j, j + 1);
      }
    }
  }
  return array;
};
