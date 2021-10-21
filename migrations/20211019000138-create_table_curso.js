'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Curso', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nome: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      Link: {
        type: Sequelize.STRING(5000),
        allowNull: false
      },
      TemaPrincipal: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      UrlImagem: {
        type: Sequelize.STRING(2000)
      },
      Keywords: {
        type: Sequelize.STRING(5000)
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
    await queryInterface.dropTable('Curso');
  }
};