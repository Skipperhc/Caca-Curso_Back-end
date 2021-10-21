'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Curso extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Curso.init(
        {
            Nome: DataTypes.STRING(200),
            Link: DataTypes.STRING(5000),
            TemaPrincipal: DataTypes.STRING(100),
            UrlImagem: DataTypes.STRING(2000),
            Keywords: DataTypes.STRING(5000)
        },
        {
            sequelize,
            modelName: 'Curso',
        }
    );
    return Curso;
};
