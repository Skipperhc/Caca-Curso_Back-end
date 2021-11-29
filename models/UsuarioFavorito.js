'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UsuarioFavorito extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UsuarioFavorito.belongsTo(models.Usuario, {
                as: 'Usuario',
                foreignKey: 'Usuario_id',
            });

            UsuarioFavorito.belongsTo(models.Curso, {
                as: 'Curso',
                foreignKey: 'Curso_id',
            });
        }
    }
    UsuarioFavorito.init(
        {
            Usuario_id: DataTypes.INTEGER,
            Curso_id: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'UsuarioFavorito',
            tableName: 'UsuarioFavorito'
        }
    );
    return UsuarioFavorito;
};
