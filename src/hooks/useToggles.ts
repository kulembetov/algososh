import { useState } from 'react';

// определяет тип для состояния переключателей
type TToggleState = boolean;

// определяет тип для состояний всех переключателей
type TToggleStates = { [key: string]: TToggleState };

// определяет тип для действий (функций), которые изменяют состояния переключателей
type TToggleActions = {
  [key: string]: (value: TToggleState) => void;
};

// определяет тип возвращаемого значения хука
type UseTogglesReturnType = [TToggleStates, TToggleActions];

// определение хука
const useToggles = (initialStates: TToggleStates): UseTogglesReturnType => {
  // использует хук useState для хранения состояний переключателей
  const [states, setStates] = useState<TToggleStates>(initialStates);

  // принимает имя переключателя и возвращает функцию для его изменения
  const toggleState = (name: string) => (value: TToggleState) => {
    // изменяет состояние, используя предыдущее состояние
    setStates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // создаёт объект T, который будет содержать функции для изменения состояний переключателей
  const T: TToggleActions = {};

  // проходит по всем начальным состояниям и создает функции для их изменения
  for (const key in initialStates) {
    T[key] = toggleState(key);
  }

  // возвращает текущие состояния и функции для их изменения
  return [states, T];
};

export default useToggles;
