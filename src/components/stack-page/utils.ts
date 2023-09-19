import { TDataElement } from '../../types/types';

// интерфейс для стека
interface IStack<T> {
  push: (item: T) => void; // добавление элемента в стек
  pop: () => void; // удаление верхнего элемента стека
  peek: () => T | null; // получение верхнего элемента стека
  clear: () => void; // очистка стека
}

// класс, реализующий интерфейс
export class Stack<T> implements IStack<T> {
  // приватное свойство для хранения элементов стека
  private container: (T | null)[] = [];

  // получение размера стека
  getSize = () => this.container.length;

  // получение всех элементов стека
  getElements = () => this.container;

  // проверка, пуст ли стек
  isEmpty = () => this.container.length === 0;

  // добавление элемента в стек
  push = (item: T) => this.container.push(item);

  // удаление верхнего элемента стека
  pop = () => {
    if (this.container.length > 0) {
      return this.container.pop();
    }
  };

  // получение верхнего элемента стека
  peek = () => this.container[this.container.length - 1];

  // очистка стека
  clear = () => (this.container = []);
}

// создание экземпляра стека с типом
export const stack = new Stack<TDataElement>();
