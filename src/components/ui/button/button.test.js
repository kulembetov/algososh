import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './button';

describe('Тест компонента Button:', () => {
  it('Компонент Button с текстом отрисован корректно', () => {
    const button = renderer.create(<Button text='Новый массив' />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Компонент Button без текста отрисован корректно', () => {
    const button = renderer.create(<Button text='' />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Компонент Button в заблокированном состоянии отрисован корректно', () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Компонент Button в состоянии загрузки отрисован корректно', () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Корректно выполняется коллбек при клике на компонент Button', () => {
    window.alert = jest.fn();
    render(<Button text='Коллбек' onClick={() => alert('Протестировано')} />);
    const button = screen.getByText('Коллбек');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Протестировано');
  });
});
