'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Avaliacao', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Usuario_id: {
        type: Sequelize.INTEGER
      },
      Curso_id: {
        type: Sequelize.INTEGER
      },
      Comentario: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Avaliacao');
  }
};