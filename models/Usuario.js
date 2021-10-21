'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Usuario.hasMany(models.Avaliacao, {
                as: 'avaliacoes',
                foreignKey: 'Usuario_id'
            });
        }
    }
    Usuario.init(
        {
            Email: DataTypes.STRING(200),
            Nome: DataTypes.STRING(200),
            IdThirdParty: DataTypes.STRING(150),
            UrlImagem: DataTypes.STRING(300),
            Provider: DataTypes.STRING(45)
        },
        {
            sequelize,
            modelName: 'Usuario',
            tableName: 'Usuario'
        }
    );
    return Usuario;
};
