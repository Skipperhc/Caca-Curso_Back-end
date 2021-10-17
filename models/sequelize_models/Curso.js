const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Curso extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Curso.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        temaPrincipal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horas: DataTypes.INTEGER,
        keywords: type.TEXT,
        likes: DataTypes.INTEGER,
        dislikes: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Curso',
        timestamps: false
    });
    return Curso;
};