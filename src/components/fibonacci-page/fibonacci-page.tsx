import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates, TDataElement } from '../../types/types';
import { updateElementsWithInterval } from '../../utils/utils';
import styles from './fibonacci-page.module.css';
import { iterativeFibonacci } from './utils';

// определение функционального компонента
export const FibonacciPage: React.FC = () => {
  // определяет состояния
  const [inputNumber, setInputNumber] = useState(-1);
  const [generatedNumbers, setGeneratedNumbers] = useState<
    (TDataElement | null)[]
  >([]);
  const [inProgress, setInProgress] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);

  // определяет флаг монтирования компонента
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // обрабатывает изменения ввода
  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const inputNumber = parseFloat(evt.currentTarget.value);
    setInputNumber(inputNumber);
  };

  // генерирует последовательность Фибоначчи
  const generateFibonacci = async () => {
    setInProgress(true);
    // вычисляет последовательности Фибоначчи с помощью итерации
    const fibonacciNumbers = inputNumber ? [...iterativeFibonacci(inputNumber)] : [];
    const numbersToRender: TDataElement[] = [];
    // преобразует чисел для отображения и анимации
    for (let i = 0; i < fibonacciNumbers.length; i++) {
      numbersToRender.push({
        value: fibonacciNumbers[i].toString(),
        state: ElementStates.Default,
      });
      // вызывает анимацию добавления числа с интервалом
      await updateElementsWithInterval(
        setGeneratedNumbers,
        numbersToRender,
        SHORT_DELAY_IN_MS,
        isComponentMounted,
      );
    }
    setInProgress(false);
    setInputNumber(-1);
  };

  // обрабатывает отправку формы
  const handleSubmitClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    generateFibonacci();
  };

  // возвращает разметку с визуализацией последовательности Фибоначчи
  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={styles.form} onSubmit={handleSubmitClick}>
        <Input
          placeholder='Введите число от 1 до 19'
          type='number'
          min={1}
          isLimitText={true}
          maxLength={2}
          max={19}
          onChange={handleInputChange}
        />
        <Button
          text='Рассчитать'
          type='submit'
          disabled={
            inputNumber
              ? inputNumber > 19 ||
              inputNumber < 1 ||
              ~~inputNumber !== inputNumber
              : true
          }
          isLoader={inProgress}
        />
      </form>
      <ul className={styles.numbers}>
        {generatedNumbers.slice(0, 10).map((number, index) => (
          <Circle
            state={number?.state}
            letter={number?.value.toString()}
            key={index}
            index={index}
          />
        ))}
      </ul>
      <ul className={styles.numbers}>
        {generatedNumbers.slice(10, 20).map((number, index) => (
          <Circle
            state={number?.state}
            letter={number?.value.toString()}
            key={index}
            index={index + 10}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};