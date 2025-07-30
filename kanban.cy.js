
describe('Kanban App', () => {
  const baseUrl = 'https://kanban-dusky-five.vercel.app';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Cria uma nova tarefa', () => {
    cy.get('[data-testid="add-task-input"]').type('Nova tarefa de teste');
    cy.get('[data-testid="add-task-button"]').click();
    cy.contains('Nova tarefa de teste').should('exist');
  });

  it('Move tarefa entre colunas', () => {
    cy.contains('Nova tarefa de teste')
      .trigger('dragstart');
    cy.get('[data-testid="done-column"]')
      .trigger('drop');
    cy.get('[data-testid="done-column"]').contains('Nova tarefa de teste');
  });

  it('Edita e exclui uma tarefa', () => {
    cy.contains('Nova tarefa de teste')
      .dblclick()
      .clear()
      .type('Tarefa editada{enter}');
    cy.contains('Tarefa editada').should('exist');

    cy.contains('Tarefa editada')
      .parent()
      .find('[data-testid="delete-task-button"]')
      .click();
    cy.contains('Tarefa editada').should('not.exist');
  });
});
