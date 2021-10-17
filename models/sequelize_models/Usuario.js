const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Usuario.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idThirdParty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        provider: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Usuario',
        timestamps: false
    });
    return Usuario;
};