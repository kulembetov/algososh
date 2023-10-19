import { fibonacciArray } from '../constants/constants';
import { standard } from '../constants/states';

describe('Тестирование страницы "Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
    cy.get('button[type=submit]').as('button');
    cy.get('[data="input-value"]').as('inputValue');
  });

  it('Состояние кнопки "Рассчитать" при пустом инпуте', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('Состояние кнопки "Рассчитать" если число больше допустимого', () => {
    const invalidInput = 20;
    cy.get('@inputValue').type(invalidInput.toString());
    cy.get('@button').should('be.disabled');
  });

  it('Состояние кнопки "Рассчитать" при корректно заполненном инпуте', () => {
    cy.get('@inputValue').type('3');
    cy.get('@button').should('not.be.disabled');
  });

  it('Проверка корректности выполненной операции и стилей', () => {
    cy.get('@inputValue').type('5');
    cy.get('@button').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(6);
      for (let i = 0; i < $circle.length; i++) {
        expect($circle.eq(i))
          .to.contain(fibonacciArray[i])
          .to.have.css('border', standard);
        expect($circle.eq(i).next('p')).to.contain(i);
      }
    });
  });
});
