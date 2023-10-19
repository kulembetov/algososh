import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { HEAD, TAIL } from '../../src/constants/element-captions';
import { textArray } from '../constants/constants';
import { changing, standard } from '../constants/states';

describe('Тестирование страницы "Очередь"', () => {
  beforeEach(() => {
    cy.visit('/queue');
    cy.contains('Очередь');
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
    cy.get('@inputValue').type('test');
    cy.get(`@buttonAdd`).should('not.be.disabled');
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при добавлении элемента', () => {
    cy.get('@inputValue').type(textArray[0]);
    cy.get('@buttonAdd').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', changing);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(0).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(0).next('p').next('div')).to.contain(TAIL);
    });

    cy.get('@inputValue').type(textArray[1]);
    cy.get('@buttonAdd').click();

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', changing);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', standard);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', standard);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
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
      expect($circle).to.have.length(7);
      expect($circle.eq(0))
        .to.contain(textArray[0])
        .to.have.css('border', changing);
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', standard);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(0)).to.contain('').to.have.css('border', standard);
      expect($circle.eq(0).prev('div')).to.contain('');
      expect($circle.eq(0).next('p')).to.contain(0);
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', standard);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).prev('div')).to.contain(HEAD);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });

    cy.get('@buttonDelete').click();

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(1))
        .to.contain(textArray[1])
        .to.have.css('border', changing);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).prev('div')).to.contain(HEAD);
      expect($circle.eq(1).next('p').next('div')).to.contain(TAIL);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      expect($circle.eq(1)).to.contain('').to.have.css('border', standard);
      expect($circle.eq(1).next('p')).to.contain(1);
      expect($circle.eq(1).prev('div')).to.contain('');
      expect($circle.eq(1).next('p').next('div')).to.contain('');
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей при нажатие кнопки "Очистить"', () => {
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@buttonReset').should('be.disabled');
    cy.get('@buttonReset').invoke('removeAttr', 'disabled');

    cy.get('@buttonReset').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(7);
      for (let i = 0; i < $circle.length; i++) {
        expect($circle.eq(i)).to.contain('').to.have.css('border', standard);
        expect($circle.eq(i).prev('div')).to.contain('');
        expect($circle.eq(i).next('p')).to.contain(i);
        expect($circle.eq(i).next('p').next('div')).to.contain('');
      }
    });
  });
});
