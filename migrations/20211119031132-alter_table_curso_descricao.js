'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Curso',
        'Descricao',
        {
          type: Sequelize.TEXT
        }
      ),
      queryInterface.addColumn(
        'Curso',
        'Provider',
        {
          type: Sequelize.TEXT
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Curso',
        'Descricao'
      ),
      queryInterface.removeColumn(
        'Curso',
        'Provider'
      ),
    ]);
  }
};
