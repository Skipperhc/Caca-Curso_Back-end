'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Avaliacao extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Avaliacao.belongsTo(models.Usuario, {
                as: 'Usuario',
                foreignKey: 'Usuario_id',
            });

            Avaliacao.belongsTo(models.Curso, {
                as: 'Curso',
                foreignKey: 'Curso_id',
            });
        }
    }
    Avaliacao.init(
        {
            Usuario_id: DataTypes.INTEGER,
            Curso_id: DataTypes.INTEGER,
            Comentario: DataTypes.STRING(1000)
        },
        {
            sequelize,
            modelName: 'Avaliacao',
        }
    );
    return Avaliacao;
};
