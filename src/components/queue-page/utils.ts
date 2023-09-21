// интерфейс для очереди
interface IQueue<T> {
  // добавление элемента в очередь
  enqueue: (item: T) => void;
  // удаление элемента из очереди
  dequeue: () => void;
  // получение элемента, находящегося в начале очереди
  peek: () => T | null;
  // очистка очереди
  clear: () => void;
}

// класс, реализующий интерфейс
export class Queue<T> implements IQueue<T> {
  // массив для хранения элементов очереди
  private container: (T | null)[] = [];
  // индекс начала очереди
  private _head = 0;
  // индекс конца очереди
  private _tail = 0;
  // максимальный размер очереди
  private readonly size: number = 0;
  // текущая длина очереди
  private length: number = 0;

  constructor(size: number) {
    // устанавливает максимальный размер очереди
    this.size = size;
    // инициализирует массив с указанным размером
    this.container = Array(size);
  }

  // проверяет на пустоту очереди
  isEmpty = () => this.length === 0;

  // получает конечный элемент
  getTailElement() {
    if (!this.isEmpty()) {
      return {
        index: this._tail - 1,
        value: this.container[this._tail - 1],
      };
    }
    return null;
  }

  // получает начальный элемент
  getHeadElement() {
    if (!this.isEmpty()) {
      return {
        index: this._head,
        value: this.container[this._head],
      };
    }
    return null;
  }

  // получает текущей длины очереди
  getSize = () => this.length;

  // получает все элементы очереди
  getElements = () => this.container;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Превышено максимальное количество длины');
    }
    // добавляет элемент в конец очереди
    this.container[this._tail % this.size] = item;
    this._tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('В очереди нет элементов');
    }
    // удаляет элемент из конца очереди
    this.container[this._head] = null;
    this._head++;
    this.length--;
  };

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('В очереди нет элементов');
    }
    // получает элемент, который находится в начале очереди
    return this.container[this._head];
  };

  clear = () => {
    // сброс индекса начала
    this._head = 0;
    // сброса индекса конца
    this._tail = 0;
    // обнуление текущей длины очереди
    this.length = 0;
  };
}
