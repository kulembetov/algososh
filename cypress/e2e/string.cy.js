import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { evenString, oddString, oneLetterString } from '../constants/constants';
import { changing, modified, standard } from '../constants/states';

describe('Тестирование страницы "Строка"', () => {
  beforeEach(() => {
    cy.visit('/recursion');
    cy.contains('Строка');
    cy.get('button[type=submit]').as(`button`);
    cy.get('[data="input-value"]').as('inputValue');
  });

  it('Состояние кнопки "Развернуть" при пустом инпуте', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('Состояние кнопки "Развернуть" при корректно заполненном инпуте', () => {
    cy.get('@inputValue').type('state');
    cy.get('@button').should('not.be.disabled');
  });

  it('Пошаговая проверка корректности выполненной операции и стилей с чётным количеством символов', () => {
    cy.get('@inputValue').type(evenString);
    cy.get('@button').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(evenString.length);
      expect($circle.eq(0))
        .to.contain(evenString[0])
        .to.have.css('border', changing);
      expect($circle.eq(1))
        .to.contain(evenString[1])
        .to.have.css('border', standard);
      expect($circle.eq(2))
        .to.contain(evenString[2])
        .to.have.css('border', standard);
      expect($circle.eq(3))
        .to.contain(evenString[3])
        .to.have.css('border', changing);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(evenString.length);
      expect($circle.eq(0))
        .to.contain(evenString[3])
        .to.have.css('border', modified);
      expect($circle.eq(1))
        .to.contain(evenString[1])
        .to.have.css('border', standard);
      expect($circle.eq(2))
        .to.contain(evenString[2])
        .to.have.css('border', standard);
      expect($circle.eq(3))
        .to.contain(evenString[0])
        .to.have.css('border', modified);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(evenString.length);
      expect($circle.eq(0))
        .to.contain(evenString[3])
        .to.have.css('border', modified);
      expect($circle.eq(1))
        .to.contain(evenString[2])
        .to.have.css('border', modified);
      expect($circle.eq(2))
        .to.contain(evenString[1])
        .to.have.css('border', modified);
      expect($circle.eq(3))
        .to.contain(evenString[0])
        .to.have.css('border', modified);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей с нечётным количеством символов', () => {
    cy.get('@inputValue').type(oddString);
    cy.get('button[type=submit]').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(oddString.length);
      expect($circle.eq(0))
        .to.contain(oddString[0])
        .to.have.css('border', changing);
      expect($circle.eq(1))
        .to.contain(oddString[1])
        .to.have.css('border', standard);
      expect($circle.eq(2))
        .to.contain(oddString[2])
        .to.have.css('border', changing);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(oddString.length);
      expect($circle.eq(0))
        .to.contain(oddString[2])
        .to.have.css('border', modified);
      expect($circle.eq(1))
        .to.contain(oddString[1])
        .to.have.css('border', modified);
      expect($circle.eq(2))
        .to.contain(oddString[0])
        .to.have.css('border', modified);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(oddString.length);
      expect($circle.eq(0))
        .to.contain(oddString[2])
        .to.have.css('border', modified);
      expect($circle.eq(1))
        .to.contain(oddString[1])
        .to.have.css('border', modified);
      expect($circle.eq(2))
        .to.contain(oddString[0])
        .to.have.css('border', modified);
    });
  });

  it('Пошаговая проверка корректности выполненной операции и стилей с одним символом', () => {
    cy.get('@inputValue').type(oneLetterString);
    cy.get('button[type=submit]').click();
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(oneLetterString.length);
      expect($circle.eq(0))
        .to.contain(oneLetterString[0])
        .to.have.css('border', modified);
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(oneLetterString.length);
      expect($circle.eq(0))
        .to.contain(oneLetterString[0])
        .to.have.css('border', modified);
    });
  });
});
