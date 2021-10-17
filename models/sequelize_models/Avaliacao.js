const { Model, DataTypes } = require('sequelize');
const Curso = require('./Curso')
const Usuario = require('./Usuario')
const Avaliacao = sequelize.define('Avaliacao', {
    CursoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Curso,
            key: 'id'
        }
    },
    UsuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dataComentario: {
        type: DataTypes.DATE, 
        allowNull: false
    }
});
Curso.belongsToMany(Actor, { through: Avaliacao });
Usuario.belongsToMany(Movie, { through: Avaliacao });


module.exports = (sequelize, DataTypes) => {
    class Avaliacao extends Model {
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
    });
    return Curso;
};