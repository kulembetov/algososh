import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { Input } from '../../components/ui/input/input';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates, TDataElement } from '../../types/types';
import { updateElementsWithInterval } from '../../utils/utils';
import styles from './queue-page.module.css';
import { Queue } from './utils';

// определение функционального компонента
export const QueuePage: React.FC = () => {
  const maxQueueSize = 7;
  // создаёт очередь с максимальным размером
  const queue = useMemo(() => new Queue<TDataElement>(maxQueueSize), []);
  const [inputValue, setInputValue] = useState('');
  const initialQueueElements = Array.from({ length: maxQueueSize }, () => ({
    value: '',
    state: ElementStates.Default,
  }));
  const [queueElements, setQueueElements] =
    useState<(TDataElement | null)[]>(initialQueueElements);
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

  // обрабатывает добавление элемента в очередь
  const handleAddClick = async () => {
    setInProgress(true);
    let tail = queue.getTailElement();
    if (tail?.value) {
      tail.value.isTail = false;
    }
    if (queue.isEmpty()) {
      queue.enqueue({
        value: inputValue,
        state: ElementStates.Changing,
        isHead: true,
        isTail: true,
      });
    } else {
      queue.enqueue({
        value: inputValue,
        state: ElementStates.Changing,
        isHead: false,
        isTail: true,
      });
    }
    await updateElementsWithInterval(
      setQueueElements,
      [...queue.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    tail = queue.getTailElement();
    if (tail?.value) {
      tail.value.state = ElementStates.Default;
    }
    await updateElementsWithInterval(
      setQueueElements,
      [...queue.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setInputValue('');
  };

  // обрабатывает удаление элемента из очереди
  const handleDeleteButtonClick = async () => {
    setInProgress(true);
    let head = queue.getHeadElement();
    let tail = queue.getTailElement();
    if (!queue.isEmpty() && head?.value) {
      head.value.state = ElementStates.Changing;
      await updateElementsWithInterval(
        setQueueElements,
        [...queue.getElements()],
        SHORT_DELAY_IN_MS,
        isComponentMounted,
      );
      head.value.isHead = false;
      queue.dequeue();
    }
    if (head?.index === tail?.index) {
      queue.clear();
    }
    head = queue.getHeadElement();
    if (!queue.isEmpty() && head?.value) {
      head.value.isHead = true;
      setQueueElements([...queue.getElements()]);
    }
    await updateElementsWithInterval(
      setQueueElements,
      [...queue.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    if (head?.value) {
      head.value.state = ElementStates.Default;
    }
    setQueueElements([...queue.getElements()]);
    setInProgress(false);
    setInputValue('');
  };

  // обрабатывает очистку очереди
  const handleClearButtonClick = async () => {
    setInProgress(true);
    queue.clear();
    await updateElementsWithInterval(
      setQueueElements,
      [...initialQueueElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setInputValue('');
  };

  // обрабатывает отправку формы
  const handleFormSubmit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && inputValue.trim() !== '') {
      handleAddClick();
    }
  };

  // возвращает разметку с визуализацией очереди
  return (
    <SolutionLayout title='Очередь'>
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
            inProgress ||
            inputValue.length === 0 ||
            queueElements.length > maxQueueSize
          }
          text='Добавить'
          onClick={handleAddClick}
          type={'submit'}
        />
        <Button
          disabled={inProgress || queue.isEmpty()}
          text='Удалить'
          extraClass={'mr-40'}
          onClick={handleDeleteButtonClick}
        />
        <Button
          disabled={inProgress || queue.isEmpty()}
          text='Очистить'
          onClick={handleClearButtonClick}
          type={'reset'}
        />
      </div>
      <ul className={styles.queue}>
        {queueElements.map((element: TDataElement | null, index: number) => (
          <Circle
            key={index}
            state={element?.state}
            letter={element?.value.toString()}
            head={element?.isHead ? 'head' : ''}
            tail={element?.isTail ? 'tail' : ''}
            index={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};