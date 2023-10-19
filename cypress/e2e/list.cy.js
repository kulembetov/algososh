import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { HEAD, TAIL } from '../../src/constants/element-captions';
import {
  circle,
  circleContent,
  circleSmall,
  initialArray,
} from '../constants/constants';
import { changing, modified, standard } from '../constants/states';

export const getCirclesData = () => {
  const circlesData = [];

  cy.get("[class*='circle_circle']").as('circles');

  cy.get('@circles')
    .children()
    .each(($child) => {
      circlesData.push($child.text());
    });

  return circlesData;
};

describe('Тестирование страницы "Список"', () => {
  beforeEach(() => {
    cy.visit('/list');
    cy.contains('Связный список');
    cy.get('[data="add-at-head-button"]').as('addButtonHead');
    cy.get('[data="add-at-index-button"]').as('addButtonIndex');
    cy.get('[data="add-at-tail-button"]').as('addButtonTail');
    cy.get('[data="delete-at-head-button"]').as('deleteButtonHead');
    cy.get('[data="delete-at-index-button"]').as('deleteButtonIndex');
    cy.get('[data="delete-at-tail-button"]').as('deleteButtonTail');
    cy.get('[data="index-value"]').as('indexValue');
    cy.get('[data="input-value"]').as('inputValue');
  });

  it('Начальное состояние страницы отрисовано корректно', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@indexValue').should('have.value', '');
    cy.get('@addButtonHead').should('be.disabled');
    cy.get('@addButtonHead').should('be.disabled');
    cy.get('@deleteButtonHead').should('not.be.disabled');
    cy.get('@deleteButtonTail').should('not.be.disabled');
    cy.get('@addButtonIndex').should('be.disabled');
    cy.get('@deleteButtonIndex').should('be.disabled');
  });

  it('Состояние кнопки "Добавить в head" и "Добавить в tail" при пустом инпуте "Введите значение"', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get(`@addButtonHead`).should('be.disabled');
    cy.get(`@addButtonTail`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить в head" и "Добавить в tail" при заполненном инпуте "Введите значение"', () => {
    cy.get('@inputValue').type('test');
    cy.get(`@addButtonHead`).should('not.be.disabled');
    cy.get(`@addButtonTail`).should('not.be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" при пустых инпутах', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@indexValue').should('have.value', '');
    cy.get(`@deleteButtonIndex`).should('be.disabled');
    cy.get(`@addButtonIndex`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" если заполнен только инпут "Введите значение"', () => {
    cy.get('@inputValue').type('test');
    cy.get('@indexValue').should('have.value', '');
    cy.get(`@deleteButtonIndex`).should('be.disabled');
    cy.get(`@addButtonIndex`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" если заполнен только инпут "Введите индекс"', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@indexValue').type(1);
    cy.get(`@deleteButtonIndex`).should('not.be.disabled');
    cy.get(`@addButtonIndex`).should('be.disabled');
  });

  it('Состояние кнопки "Добавить по индексу" и "Удалить по индексу" если заполнены все инпуты', () => {
    cy.get('@inputValue').type('test');
    cy.get('@indexValue').type(1);
    cy.get(`@deleteButtonIndex`).should('not.be.disabled');
    cy.get(`@addButtonIndex`).should('not.be.disabled');
  });

  it('Корректная отрисовка дефолтного списка', () => {
    cy.get("[class*='circle_circle']").as('circles');

    cy.get('@circles').should(($circle) => {
      expect($circle).to.have.length(initialArray.length);
      for (let i = 0; i < initialArray.length - 1; i++) {
        expect($circle.eq(i)).to.contain(initialArray[i]);
        expect($circle.eq(i).next('p')).to.contain(i);
      }
      expect($circle.eq(0).prev('div')).to.contain(HEAD);
      expect($circle.eq(3).next('p').next('div')).to.contain(TAIL);
    });
  });

  it('Добавление элемента в HEAD реализовано корректно', () => {
    const value = '3';
    cy.get('@inputValue').type(value);
    cy.get('@addButtonHead').should('not.be.disabled');
    cy.get('@addButtonHead').click();
    cy.get('@addButtonHead')
      .invoke('attr', 'class')
      .then((classList) => {
        expect(classList).contains('loader');
      });

    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke('attr', 'class')
        .then(() => {
          cy.get(circleSmall).should('have.css', 'border', changing);
        });

      cy.get(item[0]).find(circleSmall).children().should('have.text', value);
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*='circle_circle']").as('circles');
    cy.get('@circles').then(($circle) => {
      cy.get($circle[0])
        .invoke('attr', 'class')
        .then(() => {
          cy.get(circle).should('have.css', 'border', modified);
        });
      cy.get($circle[0]).children().should('have.text', value);
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circles').then(($circle) => {
      cy.get($circle[0])
        .invoke('attr', 'class')
        .then(() => {
          cy.get(circle).should('have.css', 'border', standard);
        });
      cy.get($circle[0]).children().should('have.text', value);
    });

    cy.get('@inputValue').should('have.text', '');
    cy.get('@addButtonHead').should('be.disabled');
  });

  it('Добавление элемента в TAIL реализовано корректно', () => {
    const value = '1';
    let arrayOfCircles = [];

    getCirclesData(arrayOfCircles);

    cy.get('@inputValue').type(value);
    cy.get('@addButtonHead').should('not.be.disabled');
    cy.get('@addButtonHead').click();
    cy.get('@addButtonHead')
      .invoke('attr', 'class')
      .then((classList) => {
        expect(classList).to.contain('loader');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').then(($circle) => {
      cy.get($circle[arrayOfCircles.length])
        .invoke('attr', 'class')
        .then(() => {
          cy.get(circle).should('have.css', 'border', modified);
        });

      cy.get($circle[arrayOfCircles.length])
        .children()
        .should('have.text', value);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').then(($circle) => {
      cy.get($circle[arrayOfCircles.length])
        .invoke('attr', 'class')
        .then(() => {
          cy.get(circle).should('have.css', 'border', standard);
        });

      cy.get($circle[arrayOfCircles.length])
        .children()
        .should('have.text', value);
    });

    cy.get('@inputValue').should('have.text', '');
    cy.get('@addButtonHead').should('be.disabled');
  });

  it('Добавление элемента по индексу реализовано корректно', () => {
    const index = '1';
    const value = '3';

    cy.get('@indexValue').type(index);

    cy.get('@inputValue').type(value);

    cy.get('@addButtonIndex').should('not.be.disabled').click();

    cy.get('@addButtonIndex')
      .invoke('attr', 'class')
      .then((classList) => expect(classList).contains('loader'));

    cy.wait(DELAY_IN_MS);

    cy.get(circle)
      .eq(index)
      .then((item) => {
        cy.get(item)
          .invoke('attr', 'class')
          .then(() => {
            cy.get(circle).should('have.css', 'border', changing);
          });
        cy.get(item).children().should('have.text', value);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@indexValue').should('have.text', '');
    cy.get('@inputValue').should('have.text', '');
    cy.get('@addButtonIndex').should('be.disabled');
  });

  it('Удаление элемента из HEAD реализовано корректно', () => {
    let arrayOfCircles = [0];

    getCirclesData(arrayOfCircles);

    cy.get('@deleteButtonHead').should('not.be.disabled');
    cy.get('@deleteButtonHead').click();

    cy.get('@deleteButtonHead')
      .invoke('attr', 'class')
      .should('contain', 'loader');

    cy.wait(DELAY_IN_MS);

    cy.get(circle).should('have.length', 3);
  });

  it('Удаление элемента из TAIL реализовано корректно', () => {
    let arrayOfCircles = [];
    getCirclesData(arrayOfCircles);
    cy.get('@deleteButtonTail').should('not.be.disabled');
    cy.get('@deleteButtonTail').click();
    cy.get('@deleteButtonTail')
      .invoke('attr', 'class')
      .then((classList) => expect(classList).contains('loader'));
    cy.wait(DELAY_IN_MS);
  });

  it('Удаление элемента по индексу реализовано корректно', () => {
    const index = '1';

    cy.get('@indexValue').type(index);
    cy.get('@deleteButtonIndex').should('not.be.disabled');
    cy.get('@deleteButtonIndex').click();

    cy.get('@deleteButtonIndex')
      .invoke('attr', 'class')
      .then((classList) => expect(classList).contains('loader'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle)
      .eq(index)
      .then((item) => {
        cy.get(item)
          .invoke('attr', 'class')
          .then(() => {
            cy.get(circle).should('have.css', 'border', changing);
          });
        cy.get(item).children().should('have.text', '');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@indexValue').should('have.text', '');
    cy.get('@deleteButtonIndex').should('be.disabled');
  });
});
