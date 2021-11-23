'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Curso extends Model {
        constructor(nome, link, temaPrincipal, urlImagem, keywords, descricao, provider)
        {
            this.Nome = nome;
            this.Link = link;
            this.TemaPrincipal = decodeURIComponent(temaPrincipal.replace('curso','').replace('course','')).trim();
            this.UrlImagem = urlImagem;
            this.Keywords = keywords;
            this.Descricao = descricao;
            this.Provider = provider;
        };
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Curso.hasMany(models.Avaliacao, {
                as: 'avaliacoes',
                foreignKey: 'Curso_id'
            });
            Curso.hasMany(models.AvaliacaoGeral, {
                as: 'avaliacoesGerais',
                foreignKey: 'Curso_id'
            });
        }
    }
    Curso.init(
        {
            Nome: DataTypes.STRING(200),
            Link: DataTypes.STRING(5000),
            TemaPrincipal: DataTypes.STRING(100),
            UrlImagem: DataTypes.STRING(2000),
            Keywords: DataTypes.STRING(5000),
            Descricao: DataTypes.STRING,
            Provider: DataTypes.STRING 
        },
        {
            sequelize,
            modelName: 'Curso',
            tableName: 'Curso'
        }
    );
    return Curso;
};
