import React, { FC, useEffect, useState } from 'react';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates, TDataElement } from '../../types/types';
import { updateElementsWithInterval } from '../../utils/utils';
import styles from './string-page.module.css';
import { getReversingStringSteps } from './utils';

// определение функционального компонента
export const StringPage: FC = () => {
  // определяет состояния
  const [inputString, setInputString] = useState('');
  const [letters, setLetters] = useState<(TDataElement | null)[]>([]);
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
    setInputString(evt.currentTarget.value);
  };

  // разворачивает строку
  const reverseString = async () => {
    setInProgress(true);
    const inputLetters: TDataElement[] = [];
    inputString.split('').forEach((element) => {
      inputLetters.push({ value: element, state: ElementStates.Default });
    });
    // получение шагов разворота строки
    const steps = getReversingStringSteps(inputString);
    let currentStep = 0;
    while (currentStep < steps.length) {
      if (steps) {
        // обновляет состояние букв с анимацией изменения состояния
        await updateElementsWithInterval(
          setLetters,
          [...inputLetters],
          DELAY_IN_MS,
          isComponentMounted,
        );
        let leftIndex = currentStep;
        let rightIndex = inputLetters.length - currentStep - 1;
        inputLetters[leftIndex].state = ElementStates.Changing;
        inputLetters[rightIndex].state = ElementStates.Changing;
        // обновляет состояние букв с анимацией изменения состояния
        await updateElementsWithInterval(
          setLetters,
          [...inputLetters],
          DELAY_IN_MS,
          isComponentMounted,
        );
        inputLetters[leftIndex].state = ElementStates.Modified;
        inputLetters[rightIndex].state = ElementStates.Modified;
        inputLetters[leftIndex].value = steps[currentStep][leftIndex];
        inputLetters[rightIndex].value = steps[currentStep][rightIndex];
        currentStep++;
      }
    }
    setInputString('');
    setInProgress(false);
  };

  // обрабатывает отправку
  const handleSubmitButtonClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    reverseString();
  };

  // возвращает страницу с визуализацией разворота строки
  return (
    <SolutionLayout title='Строка'>
      <form className={styles.form} onSubmit={handleSubmitButtonClick}>
        <Input
          data='input-value'
          value={inputString}
          isLimitText={true}
          maxLength={11}
          onChange={handleInputChange}
        />
        <Button
          text='Развернуть'
          type='submit'
          disabled={inProgress || !inputString}
          isLoader={inProgress}
        />
      </form>
      <ul className={styles.list}>
        {letters.map((letter, index) => (
          <Circle
            state={letter?.state}
            letter={letter?.value.toString()}
            key={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};