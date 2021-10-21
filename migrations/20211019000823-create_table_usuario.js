'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuario', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Email: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      Nome: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      IdThirdParty: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      UrlImagem: {
        type: Sequelize.STRING(300)
      },
      Provider: {
        type: Sequelize.STRING(45),
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
    await queryInterface.dropTable('Usuario');
  }
};