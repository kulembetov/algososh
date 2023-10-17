import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('Тест компонента Button:', () => {
  it('Компонент Button без буквы отрисован корректно', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button c буквой отрисован корректно', () => {
    const circle = renderer.create(<Circle letter='F' />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button с HEAD отрисован корректно', () => {
    const circle = renderer.create(<Circle head='F' />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button с react-элементом в HEAD отрисован корректно', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button с TAIL отрисован корректно', () => {
    const circle = renderer.create(<Circle tail='F' />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button с react-элементом в TAIL отрисован корректно', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button с index отрисован корректно', () => {
    const circle = renderer.create(<Circle index='5' />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button с isSmall === true отрисован корректно', () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button в состоянии default отрисован корректно', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button в состоянии changing отрисован корректно', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Компонент Button в состоянии modified отрисован корректно', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
