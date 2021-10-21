'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FavoritoUsuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            FavoritoUsuario.belongsTo(models.Usuario, {
                as: 'Usuario',
                foreignKey: 'Usuario_id',
            });

            FavoritoUsuario.belongsTo(models.Curso, {
                as: 'Curso',
                foreignKey: 'Curso_id',
            });
        }
    }
    FavoritoUsuario.init(
        {
            Usuario_id: DataTypes.INTEGER,
            Curso_id: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'FavoritoUsuario',
        }
    );
    return FavoritoUsuario;
};
