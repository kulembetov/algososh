import { TDataElement } from '../../types/types';

// определение узла связного списка
export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

// интерфейс для связного списка
interface ILinkedList<T> {
  // добаление элемента в конец списка
  append: (element: T) => void;
  // получение размера списка
  getSize: () => number;
  // вывод списка в консоль
  printValues: () => void;
}

// класс, реализующий интерфейс
export class LinkedList<T> implements ILinkedList<T> {
  // головной узел списка
  private head: Node<T> | null;
  // размер списка
  private size: number;

  constructor(initArray?: T[]) {
    this.head = null;
    this.size = 0;
    // инициализирует список, если задан массив
    initArray?.forEach((node) => this.append(node));
  }

  // проверяет на пустоту списка
  isEmpty = () => this.size === 0;

  // получает размера списка
  getSize = () => this.size;

  // добавляет элемента в конец списка
  append(element: T) {
    const node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current?.next) {
        current = current.next;
      }
      if (current) {
        current.next = new Node(element);
      }
    }
    this.size++;
  }

  // добавляет элемента в начало списка
  prepend(element: T) {
    const node = new Node(element);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // добавляет элемент по индексу
  addAtIndex(position: number, value: T) {
    if (position < 0 || position > this.size) {
      throw new Error('Неправильное значение индекса');
    }
    const node = new Node(value);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev = null;
      let index = 0;
      while (index < position) {
        prev = current;
        current = current ? current.next : null;
        index++;
      }
      if (prev) {
        prev.next = node;
      }
      node.next = current;
    }
    this.size++;
  }

  // удаляет элемент по индексу
  deleteAtIndex(position: number) {
    if (position < 0 || position > this.size) {
      throw new Error('Неправильное значение индекса');
    }
    let current = this.head;
    if (position === 0 && current) {
      this.head = current.next;
    } else {
      let prev = null;
      let index = 0;
      while (index < position) {
        prev = current;
        current = current ? current.next : null;
        index++;
      }
      if (prev && current) {
        prev.next = current.next;
      }
    }
    this.size--;
    return current ? current.value : null;
  }

  // получение элемента по списку
  getAtIndex(position: number) {
    if (position < 0 || position > this.size) {
      throw new Error('Неправильное значение индекса');
    }
    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current ? current.next : null;
      index++;
    }
    return current ? current.value : null;
  }

  // удаление головного элемента
  deleteHead = () => {
    let temp = this.head;
    if (temp) {
      this.head = temp.next;
      this.size--;
      return;
    }
  };

  // удаление последнего элемента
  deleteTail = () => {
    if (!this.head || !this.head.next) {
      return null;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = null;
    this.size--;
    return current ? current.value : null;
  };

  // преобразование связного списка в массив
  toArray = () => {
    const array = [];
    let current = this.head;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  };

  // вывод значений в консоль
  printValues() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}

// создание экземпляра связного списка с типом
export const list = new LinkedList<TDataElement>();
