import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { ArrowIcon } from '../../components/ui/icons/arrow-icon';
import { Input } from '../../components/ui/input/input';
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates, TDataElement } from '../../types/types';
import { updateElementsWithInterval } from '../../utils/utils';
import styles from './list-page.module.css';
import { LinkedList } from './utils';

// определение функционального компонента
export const ListPage: FC = () => {
  const initialListElements = useMemo(() => ['0', '34', '8', '1'], []);
  const list = useMemo(
    () => new LinkedList<string | number>(initialListElements),
    [initialListElements],
  );
  const initialList: TDataElement[] = useMemo(() => [], []);
  // определение состояний
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<number>(-1);
  const [listElements, setListElements] = useState<(TDataElement | null)[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [isAddingHead, setIsAddingHead] = useState(false);
  const [isDeletingHead, setIsDeletingHead] = useState(false);
  const [isAddingTail, setIsAddingTail] = useState(false);
  const [isDeletingTail, setIsDeletingTail] = useState(false);
  const [isAddingAtIndex, setIsAddingAtIndex] = useState(false);
  const [isDeletingAtIndex, setIsDeletingAtIndex] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);

  // определяет флаг монтирования компонента
  useEffect(() => {
    setIsMounted(true);
    // инициализирует начальные элементы списка
    initialListElements.forEach((element) => {
      initialList.push({
        value: element,
        state: ElementStates.Default,
        isHead: false,
        isTail: false,
        isLinked: true,
      });
    });
    // устанавливает головной и хвостовой элемент
    initialList[0].isHead = true;
    initialList[initialList.length - 1].isTail = true;
    initialList[initialList.length - 1].isLinked = false;
    setListElements(initialList);
    return () => {
      setIsMounted(false);
    };
  }, [initialList, initialListElements, list]);

  // обрабатывает изменения ввода
  const handleValueChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  // обрабатывает изменения индекса
  const handleIndexChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(parseInt(evt.currentTarget.value));
  };

  // обрабатывает добавление в головной
  const handleAddToHeadClick = async () => {
    setInProgress(true);
    setIsAddingHead(true);
    // помечает головной элемент для изменения
    listElements[0]!.isHead = false;
    listElements[0]!.isLinked = true;
    listElements[0]!.changingPosition = true;
    listElements[0]!.newValue = inputValue;
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    // добавляет элемент в голову списка
    listElements[0]!.changingPosition = false;
    list.prepend(inputValue);
    const head = list.getAtIndex(0);
    listElements.unshift({
      value: head ? head : '',
      state: ElementStates.Modified,
      isHead: true,
      isTail: false,
      isLinked: true,
    });
    setListElements([...listElements]);
    // устанавливает состояние по умолчанию для головного элемента
    listElements[0]!.state = ElementStates.Default;
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setIsAddingHead(false);
    setInputIndex(-1);
    setInputValue('');
  };

  // обрабатывает добавление хвостового элемента
  const handleAddTailClick = async () => {
    setInProgress(true);
    setIsAddingTail(true);
    let tailIndex = list.getSize() - 1;
    if (tailIndex === 0) {
      listElements[tailIndex]!.isHead = false;
    }
    // помечает последний элемент для изменения
    listElements[tailIndex]!.isTail = false;
    listElements[tailIndex]!.changingPosition = true;
    listElements[tailIndex]!.newValue = inputValue;
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    listElements[tailIndex]!.changingPosition = false;
    listElements[tailIndex]!.isLinked = true;
    listElements[0]!.isHead = true;
    // добавляет элемент в конец списка
    list.append(inputValue);
    const tail = list.getAtIndex(tailIndex);
    listElements.push({
      value: tail ? tail : '',
      state: ElementStates.Modified,
      isTail: true,
      isLinked: false,
    });
    setListElements([...listElements]);
    tailIndex = list.getSize() - 1;
    // устанавливает состояние по умолчанию для последнего элемента
    listElements[tailIndex]!.state = ElementStates.Default;
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setIsAddingTail(false);
    setInputIndex(-1);
    setInputValue('');
  };

  // обрабатывает удаление головного элемента
  const handleDeleteHeadClick = async () => {
    setInProgress(true);
    setIsDeletingHead(true);
    // помечает головной элемент для изменения
    listElements[0]!.changingPosition = true;
    listElements[0]!.newValue = listElements[0]!.value;
    listElements[0]!.value = '';
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    listElements[0]!.changingPosition = false;
    // удаляет головной элемент из списка
    list.deleteHead();
    listElements.shift();
    listElements[0]!.isHead = true;
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setIsDeletingHead(false);
    setInputIndex(-1);
    setInputValue('');
  };

  // обрабатывает удаление хвостового элемента 
  const handleDeleteTailClick = async () => {
    setInProgress(true);
    setIsDeletingTail(true);
    listElements[list.getSize() - 1]!.changingPosition = true;
    listElements[list.getSize() - 1]!.newValue =
      listElements[list.getSize() - 1]!.value;
    listElements[list.getSize() - 1]!.value = '';
    listElements[list.getSize() - 1]!.isTail = false;
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    listElements[list.getSize() - 1]!.changingPosition = false;
    list.deleteTail();
    listElements.pop();
    listElements[list.getSize() - 1]!.isTail = true;
    listElements[list.getSize() - 1]!.isLinked = false;
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setIsDeletingTail(false);
    setInputIndex(-1);
    setInputValue('');
  };

  // обрабатывает добавление элемента по индексу
  const handleAddIndexClick = async () => {
    setInProgress(true);
    setIsAddingAtIndex(true);
    list.addAtIndex(inputIndex, inputValue);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i]!.state = ElementStates.Changing;
      listElements[i]!.changingPosition = true;
      listElements[i]!.newValue = inputValue;
      listElements[i]!.isHead = false;
      await updateElementsWithInterval(
        setListElements,
        [...listElements],
        SHORT_DELAY_IN_MS,
        isComponentMounted,
      );
      listElements[i]!.changingPosition = false;
      if (inputIndex !== 0) {
        listElements[0]!.isHead = true;
      }
    }
    const insertedNode = list.getAtIndex(inputIndex);
    listElements.splice(inputIndex, 0, {
      value: insertedNode ? insertedNode : '',
      state: ElementStates.Modified,
      isLinked: true,
    });
    listElements[0]!.isHead = true;
    listElements[list.getSize() - 1]!.isTail = true;
    setListElements([...listElements]);
    for (let i = 0; i <= inputIndex + 1; i++) {
      listElements[i]!.state = ElementStates.Default;
    }
    await updateElementsWithInterval(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setIsAddingAtIndex(false);
    setInputIndex(-1);
    setInputValue('');
  };

  // обрабатывает удаление элемента по индексу
  const handleDeleteIndexClick = async () => {
    setInProgress(true);
    setIsDeletingAtIndex(true);
    list.deleteAtIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i]!.state = ElementStates.Changing;
      listElements[i]!.changingPosition = true;
      listElements[i]!.isTail = false;
      setListElements([...listElements]);
      if (i === inputIndex) {
        const value = listElements[i]!.value;
        listElements[i]!.value = '';
        await updateElementsWithInterval(
          setListElements,
          [...listElements],
          SHORT_DELAY_IN_MS,
          isComponentMounted,
        );
        listElements[i]!.newValue = value;
      }
      await updateElementsWithInterval(
        setListElements,
        [...listElements],
        SHORT_DELAY_IN_MS,
        isComponentMounted,
      );
      listElements[i]!.changingPosition = false;
      setListElements([...listElements]);
    }
    listElements.splice(inputIndex, 1);
    listElements[0]!.isHead = true;
    listElements[list.getSize() - 1]!.isTail = true;
    listElements[list.getSize() - 1]!.isLinked = false;
    setListElements([...listElements]);
    for (let i = 0; i < inputIndex; i++) {
      listElements[i]!.state = ElementStates.Default;
    }
    setInProgress(false);
    setIsDeletingAtIndex(false);
    setInputIndex(-1);
    setInputValue('');
  };

  // возвращает разметку с визуализацией связанного списка
  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.box}>
        <div className={styles.controls}>
          <Input
            placeholder='Введите значение'
            min={1}
            value={inputValue}
            onChange={handleValueChange}
            isLimitText={true}
            maxLength={4}
            disabled={inProgress}
          />
          <Button
            text='Добавить в head'
            onClick={handleAddToHeadClick}
            isLoader={isAddingHead}
            disabled={(inProgress && !isAddingHead) || inputValue.length === 0}
            extraClass={styles.small}
          />
          <Button
            text='Добавить в tail'
            onClick={handleAddTailClick}
            isLoader={isAddingTail}
            disabled={(inProgress && !isAddingTail) || inputValue.length === 0}
            extraClass={styles.small}
          />
          <Button
            text='Удалить из head'
            onClick={handleDeleteHeadClick}
            isLoader={isDeletingHead}
            disabled={list.isEmpty() || list.getSize() < 2}
            extraClass={styles.small}
          />
          <Button
            text='Удалить из tail'
            onClick={handleDeleteTailClick}
            isLoader={isDeletingTail}
            disabled={list.isEmpty() || list.getSize() < 2}
            extraClass={styles.small}
          />
        </div>
        <div className={styles.controls}>
          <Input
            placeholder='Введите индекс'
            type='number'
            extraClass={styles.input}
            value={inputIndex >= 0 ? inputIndex : ''}
            onChange={handleIndexChange}
            disabled={inProgress}
          />
          <Button
            text='Добавить по индексу'
            extraClass={styles.large}
            onClick={handleAddIndexClick}
            isLoader={isAddingAtIndex}
            disabled={
              inputIndex < 0 ||
              inputIndex >= list.getSize() ||
              inputValue.length === 0
            }
          />
          <Button
            text='Удалить по индексу'
            extraClass={styles.large}
            onClick={handleDeleteIndexClick}
            isLoader={isDeletingAtIndex}
            disabled={
              inputIndex < 0 || list.isEmpty() || inputIndex >= list.getSize()
            }
          />
        </div>
      </div>
      <ul className={styles.list}>
        {listElements.map((element, index) => (
          <div className={styles.node} key={index}>
            {(isAddingHead || isAddingTail || isAddingAtIndex) &&
              element?.changingPosition && (
                <Circle
                  state={ElementStates.Changing}
                  letter={element?.newValue?.toString()}
                  isSmall={true}
                  extraClass={styles.adding}
                />
              )}
            <Circle
              state={element?.state}
              letter={element?.value.toString()}
              head={element?.isHead ? 'head' : ''}
              tail={element?.isTail ? 'tail' : ''}
              index={index}
              extraClass={'mr-6 ml-6'}
            />
            {(isDeletingHead || isDeletingTail || isDeletingAtIndex) &&
              element?.changingPosition && (
                <Circle
                  state={ElementStates.Changing}
                  letter={element?.newValue?.toString()}
                  isSmall={true}
                  extraClass={styles.deleting}
                />
              )}
            {element?.isLinked && !element?.isTail && (
              <ArrowIcon
                fill={
                  element?.state === ElementStates.Changing
                    ? '#d252e1'
                    : '#0032ff'
                }
              />
            )}
          </div>
        ))}
      </ul>
    </SolutionLayout>
  );
};