// перечисление для состояний элемента
export enum ElementStates {
  // стандартное состояние
  Default = 'default',
  // изменение
  Changing = 'changing',
  // измененное состояние
  Modified = 'modified',
}

// перечисление для направления сортировки
export enum Direction {
  // по возрастанию
  Ascending = 'ascending',
  // по убыванию
  Descending = 'descending',
}

// перечисление для алгоритмов сортировки
export enum SortAlgorithm {
  // сортировка пузырьком
  bubble = 'пузырек',
  // сортировка выбором
  selectsort = 'выбор',
}

// тип данных элемента данных
export type TDataElement = {
  // значение элемента
  value: string | number;
  // состояние элемента
  state: ElementStates;
  // является ли головным
  isHead?: boolean;
  // является ли хвостовым
  isTail?: boolean;
  // связан ли с другим
  isLinked?: boolean;
  // изменяется ли позиция
  changingPosition?: boolean;
  // новое значение
  newValue?: string | number;
};
