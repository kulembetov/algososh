import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button/button';
import { Column } from '../../components/ui/column/column';
import { RadioInput } from '../../components/ui/radio-input/radio-input';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import {
  Direction,
  ElementStates,
  SortAlgorithm,
  TDataElement,
} from '../../types/types';
import { getRandomInt, updateElementsWithInterval } from '../../utils/utils';
import styles from './sorting-page.module.css';
import { getBubbleSortSteps, getSelectionSortSteps } from './utils';

// определение функционального компонента
export const SortingPage: React.FC = () => {
  // определяет состояния
  const [array, setArray] = useState<(TDataElement | null)[]>([]);
  const [isAscending, setIsAscending] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [sortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm | null>(
    null,
  );
  const [isComponentMounted, setIsMounted] = useState(false);

  // определяет флаг монтирования компонента
  useEffect(() => {
    setIsMounted(true);
    setSortAlgorithm(SortAlgorithm.selectsort);
    generateRandomArray();
    return () => {
      setIsMounted(false);
    };
  }, []);

  // генерация случайного массива для сортировки
  const generateRandomArray = () => {
    const minLength = 3;
    const maxLength = 17;
    const minValue = 0;
    const maxValue = 100;
    const arrayLength = getRandomInt(minLength, maxLength);
    const randomArray = Array.from({ length: arrayLength }, () => ({
      value: getRandomInt(minValue, maxValue),
      state: ElementStates.Default,
    }));
    setArray([...randomArray]);
  };

  // ассинхронная сортировка выбором
  const performSelectionSort = async (isAscending: boolean) => {
    const steps = getSelectionSortSteps(
      array ? [...array] : [],
      isAscending,
    );
    let currentStep = 0;
    while (currentStep < steps.length) {
      if (steps) {
        await updateElementsWithInterval(
          setArray,
          [...steps[currentStep]],
          SHORT_DELAY_IN_MS,
          isComponentMounted,
        );
        currentStep++;
      }
    }
  };

  // асинхронная сортировка пузырьком
  const performBubbleSort = async (isAscending: boolean) => {
    const steps = getBubbleSortSteps(
      array ? [...array] : [],
      isAscending,
    );
    let currentStep = 0;
    while (currentStep < steps.length) {
      if (steps) {
        await updateElementsWithInterval(
          setArray,
          [...steps[currentStep]],
          SHORT_DELAY_IN_MS,
          isComponentMounted,
        );
        currentStep++;
      }
    }
  };

  // асинхронная сортировка массива
  const sortArray = async (isAscending: boolean) => {
    setInProgress(true);
    if (sortAlgorithm === SortAlgorithm.selectsort) {
      await performSelectionSort(isAscending);
    }
    if (sortAlgorithm === SortAlgorithm.bubble) {
      await performBubbleSort(isAscending);
    }
    setInProgress(false);
  };

  // обрабатывает клик на кнопку сортировки
  const handleSortClick = async (direction: Direction) => {
    setInProgress(true);
    setIsAscending(direction === Direction.Ascending);
    setIsAscending((state) => {
      sortArray(state);
      return state;
    });
    setInProgress(false);
  };

  // возвращает страницу с визуализацией сортировки массива
  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.box}>
        <div className={styles.radios}>
          <RadioInput
            name='radio'
            label='Выбор'
            value='selection'
            onChange={() => setSortAlgorithm(SortAlgorithm.selectsort)}
            checked={sortAlgorithm === SortAlgorithm.selectsort}
          />
          <RadioInput
            name='radio'
            label='Пузырек'
            value='bubble'
            checked={sortAlgorithm === SortAlgorithm.bubble}
            onChange={() => setSortAlgorithm(SortAlgorithm.bubble)}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text='По возрастанию'
            sorting={Direction.Ascending}
            extraClass={`mr-12 ${styles.button}`}
            disabled={inProgress}
            isLoader={inProgress && isAscending}
            onClick={() => handleSortClick(Direction.Ascending)}
          />
          <Button
            text='По убыванию'
            sorting={Direction.Descending}
            extraClass={`mr-40 ${styles.button}`}
            disabled={inProgress}
            isLoader={inProgress && !isAscending}
            onClick={() => handleSortClick(Direction.Descending)}
          />
          <Button
            disabled={inProgress}
            text='Новый массив'
            onClick={generateRandomArray}
          />
        </div>
      </div>
      <div className={styles.bars}>
        {array?.map((element, index) => (
          <Column
            index={parseInt(element!.value.toString())}
            state={element?.state}
            key={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};