'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Curso',
      'Descricao',
      Sequelize.TEXT
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Curso',
      'Descricao'
    );
  }
};
