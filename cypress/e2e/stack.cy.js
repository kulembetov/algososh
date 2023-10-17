import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { TOP } from '../../src/constants/element-captions';
import { textArray } from '../constants/constants';
import { changing, standard } from '../constants/states';

describe('Тестирование страницы "Стек"', () => {
  beforeEach(() => {
    cy.visit('/stack');
    cy.contains('Стек');
    cy.get('button[type=submit]').as('buttonAdd');
    cy.get('button[type=reset]').as('buttonReset');
    cy.contains('Удалить').as('buttonDelete');
    cy.get('[data="input-value"]').as('inputValue');
  });

  it('Состояние кнопки "Добавить" при пустом инпуте', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get(`@buttonAdd`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить" при корректно заполненном инпуте', () => {
    cy.get('@inputValue').type(textArray[0]);
    cy.get(`@buttonAdd`).should('not.be.disabled');
  });

  it('Состояние кнопок "Удалить" и "Очистить" при добавленных данных в стек', () => {
    cy.get('@inputValue').type(textArray[0]);
    cy.get(`@buttonAdd`).click();
    cy.get('@buttonDelete').should('not.be.disabled');
    cy.get('@buttonReset').should('not.be.disabled');
  });

  it('Состояние кнопок "Удалить" и "Очистить" при пустых данных в стеке', () => {
    cy.get("[class*='circle_circle']").should('not.be.exist');
    cy.get('@buttonDelete').should('be.disabled');
    cy.get('@buttonReset').should('be.disabled');
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при добавлении элемента', () => {
    cy.get('@inputValue').type(textArray[0]);
    cy.get('@buttonAdd').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).prev('div')).to.contain(TOP);
      expect($circle.eq(0).next('p')).to.contain(0);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).prev('div')).to.contain(TOP);
      expect($circle.eq(0).next('p')).to.contain(0);
    });

    cy.get('@inputValue').type(textArray[1]);
    cy.get('@buttonAdd').click();

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(2);
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', changing);
      expect($circle.eq(1).prev('div')).to.contain(TOP);
      expect($circle.eq(1).next('p')).to.contain(1);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(2);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(0).prev('div')).to.contain('');
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', standard);
      expect($circle.eq(1).prev('div')).to.contain(TOP);
      expect($circle.eq(1).next('p')).to.contain(1);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при удалении элемента', () => {
    textArray.forEach((text) => {
      cy.get('@inputValue').type(text);
      cy.get('@buttonAdd').click();
      cy.wait(DELAY_IN_MS);
    });
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@buttonDelete').click();

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(2);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', changing);
      expect($circle.eq(1).prev('div')).to.contain(TOP);
      expect($circle.eq(1).next('p')).to.contain(1);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).prev('div')).to.contain(TOP);
      expect($circle.eq(0).next('p')).to.contain(0);
    });

    cy.get('@buttonDelete').click();

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', changing);
      expect($circle.eq(0).prev('div')).to.contain(TOP);
      expect($circle.eq(0).next('p')).to.contain(0);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').should('have.length', 0);
    cy.get('@circles').should('not.be.exist');
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при нажатии на кнопку "Очистить"', () => {
    textArray.forEach((text) => {
      cy.get('@inputValue').type(text);
      cy.get('@buttonAdd').click();
      cy.wait(DELAY_IN_MS);
    });
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@buttonReset').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').should('have.length', 0);
    cy.get('@circles').should('not.be.exist');
  });
});
