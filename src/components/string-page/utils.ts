import { ElementStates } from '../../types/types';
import { swap } from '../../utils/utils';

// функция, которая принимает строку и возвращает массив шагов для реверса строки
export const getReversingStringSteps = (sourceString: string): string[][] => {
  // создаёт пустой массив steps для хранения шагов реверса
  const steps: string[][] = [];

  // разбивает исходную строку на массив символов
  const letters = sourceString.split('');

  // устанавливает начальную и конечную позиции для реверса
  let start = 0;
  let end = letters.length - 1;

  // запускает цикл, пока начальная позиция меньше или равна конечной
  while (start <= end) {
    // если начальная и конечная позиции равны, то добавляет текущее состояние массива в steps и завершает цикл
    if (end === start) {
      steps.push([...letters]);
      break;
    } else {
      // иначе выполняет обмен символами между начальной и конечной позициями
      swap(letters, start, end);

      // добавляет текущее состояние массива в steps
      steps.push([...letters]);

      // увеличивает начальную позицию и уменьшает конечную позицию
      start++;
      end--;
    }
  }

  // возвращает массив всех шагов реверса
  return steps;
};

// функция, которая возвращает значение ElementStates.Modified
export const getLetterState = (/*...*/): ElementStates => {
  return ElementStates.Modified;
};
