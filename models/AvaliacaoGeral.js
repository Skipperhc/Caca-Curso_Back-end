'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AvaliacaoGeral extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            AvaliacaoGeral.belongsTo(models.Usuario, {
                as: 'Usuario',
                foreignKey: 'Usuario_id',
            });

            AvaliacaoGeral.belongsTo(models.Curso, {
                as: 'Curso',
                foreignKey: 'Curso_id',
            });
        }
    }
    AvaliacaoGeral.init(
        {
            Usuario_id: DataTypes.INTEGER,
            Curso_id: DataTypes.INTEGER,
            AvaliacaoGeral: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'AvaliacaoGeral',
            tableName: 'AvaliacaoGeral'
        }
    );
    return AvaliacaoGeral;
};
