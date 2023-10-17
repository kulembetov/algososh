import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates, TDataElement } from '../../types/types';
import { updateElementsWithInterval } from '../../utils/utils';
import styles from './stack-page.module.css';
import { stack } from './utils';

// определение функционального компонента
export const StackPage: React.FC = () => {
  // определяет состояния
  const [inputValue, setInputValue] = useState('');
  const [stackElements, setStackElements] = useState<(TDataElement | null)[]>(
    [],
  );
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
    setInputValue(evt.currentTarget.value);
  };

  // обрабатывает добавление
  const handleAddClick = async () => {
    setInProgress(true);
    // получает последний элемент стека
    let lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.isHead = false;
    }
    // добавляет новый элемент в стек с анимацией изменения состояния
    stack.push({
      value: inputValue,
      state: ElementStates.Changing,
      isHead: true,
    });
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    // восстанавливает состояние последнего элемента стека и завершает анимацию
    lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Default;
    }
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    // сбрасывает состояний и введеного значений
    setInProgress(false);
    setInputValue('');
  };

  // обрабатывает удаление
  const handleDeleteClick = async () => {
    setInProgress(true);
    // получает последний элемент стека
    let lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Changing;
    }
    // удаляет последний элемент стека с анимацией изменения состояния
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    stack.pop();
    // восстанавливает состояние нового последнего элемента стека и устанавливает его как головной
    lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Default;
      lastElement.isHead = true;
    }
    // завершает анимации
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    // сброс состояния индикатора выполнения
    setInProgress(false);
  };

  // обрабатывает очистку
  const handleClearClick = async () => {
    setInProgress(true);
    // очищает стек с анимацией изменения состояния
    stack.clear();
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    // завершает анимации и сброс состояния индикатора выполнения 
    setInProgress(false);
  };

  // обрабатывает отправку формы
  const handleFormSubmit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && inputValue.trim() !== '') {
      handleAddClick();
    }
  };

  // возвращает разметку, с визуализацией стека
  return (
    <SolutionLayout title='Стек'>
      <div className={styles.box}>
        <Input
          data='input-value'
          value={inputValue}
          maxLength={4}
          isLimitText={true}
          onChange={handleInputChange}
          onKeyDown={handleFormSubmit}
        />
        <Button
          disabled={
            inProgress || inputValue.length === 0 || stackElements.length > 9
          }
          text='Добавить'
          onClick={handleAddClick}
          type={'submit'}
        />
        <Button
          disabled={inProgress || stackElements.length === 0}
          text='Удалить'
          extraClass={'mr-40'}
          onClick={handleDeleteClick}
        />
        <Button
          disabled={inProgress || stackElements.length === 0}
          text='Очистить'
          onClick={handleClearClick}
          type={'reset'}
        />
      </div>
      <ul className={styles.stack}>
        {stackElements.map((element: TDataElement | null, index: number) => (
          <Circle
            key={index}
            state={element?.state}
            letter={element?.value.toString()}
            head={element?.isHead ? 'top' : ''}
            index={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};