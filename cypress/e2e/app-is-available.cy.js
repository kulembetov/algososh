describe('Работоспособность приложения', () => {
  it('Подключение к главной странице', () => {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
  });
});
