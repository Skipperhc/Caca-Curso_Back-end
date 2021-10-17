const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('cacacurso', 'user', '123123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});

module.exports = sequelize

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const syncAllModels = async () => {
    //isso vai atualizar todas as tabelas de acordo com o que estiver configurado no 
    await sequelize.sync({ alter: true });
}