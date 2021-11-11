const models = require('../models');

const getById = async (usuarioFavorito_Id) => {
    const usuarioFavorito = await models.UsuarioFavorito.findOne({
        where: {
            Id: parseInt(usuarioFavorito_Id),
        },
    });

    if (!usuarioFavorito) {
        throw new Error('Favorito do usuário não encontrado!');
    }

    return usuarioFavorito;
};

// exemplo com select entre tabelas
const getAllWithJoins = async () => {
    const usuarioFavoritos = await models.UsuarioFavorito.findAll({
        include: [
            {
                as: 'Curso',
                model: models.Curso,
            },
            {
                as: 'Usuario',
                model: models.Usuario
            }
        ]
    });

    if (!usuarioFavoritos) {
        throw new Error('Erro ao tentar encontrar os favoritos do usuário!');
    }

    return usuarioFavoritos;
};

const getAll = async () => {
    const usuarioFavoritos = await models.UsuarioFavorito.findAll();

    if (!usuarioFavoritos) {
        throw new Error('Erro ao buscar pelos favoritos do usuário!');
    }

    return usuarioFavoritos;
};

const create = async (usuarioFavorito) => {
    const newUsuarioFavorito = models.UsuarioFavorito.create(usuarioFavorito);
    return newUsuarioFavorito;
};

const update = async (usuarioFavorito) => {
    const updatedUsuarioFavorito = await models.UsuarioFavorito.update(usuarioFavorito, {
        where: {
            Id: usuarioFavorito.Id,
        },
    });

    if (updatedUsuarioFavorito[0] > 0) {
        return {
            ...usuarioFavorito,
            message: 'Favorito do usuário atualizado com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou atualizado!');
    }
};

const remove = async (usuarioFavorito_Id) => {
    const removedUsuarioFavorito = await models.UsuarioFavorito.destroy({
        where: {
            Id: parseInt(usuarioFavorito_Id),
        },
    });

    if (removedUsuarioFavorito > 0) {
        return {
            avaliacaoGeral_Id: usuarioFavorito_Id,
            message: 'Favorito do usuário excluido com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou excluido!');
    }
};

module.exports = {
    getById,
    getAll,
    getAllWithJoins,
    create,
    update,
    remove,
};
