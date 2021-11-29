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

const getCursosFavoritos = async (usuarioId) => {
    console.log("Id do usuário no service ", usuarioId)

    if (!usuarioId) {
        throw new Error('Id do usuário não informado!');
    }

    const cursosEncontrados = await models.UsuarioFavorito.findAll({
        include: {
            as: 'Curso',
            model: models.Curso,
        },
        where: {
            Usuario_id: usuarioId
        },
    })

    if (!cursosEncontrados) {
        return null;
    }

    return cursosEncontrados;
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

const getByIdCursoUsuario = async (cursoId, usuarioId) => {
    const favoritoExistente = await models.UsuarioFavorito.findOne({
        where: {
            Curso_id: cursoId,
            Usuario_id: usuarioId,
        },
    });

    if (!favoritoExistente) {
        return null
    }

    return favoritoExistente;
};

const create = async (usuarioFavorito) => {
    const usuarioFavoritoExistente = await getByIdCursoUsuario(usuarioFavorito.Curso_id, usuarioFavorito.Usuario_id)
    if (usuarioFavoritoExistente) {
        return usuarioFavoritoExistente
    } else {
        const newUsuarioFavorito = await models.UsuarioFavorito.create(usuarioFavorito);
        return newUsuarioFavorito;
    }
};

const update = async (usuarioFavorito) => {
    const updatedUsuarioFavorito = await models.UsuarioFavorito.update(usuarioFavorito, {
        where: {
            Id: usuarioFavorito.Id,
        },
    });

    if (updatedUsuarioFavorito[0] > 0) {
        return usuarioFavorito
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
    getCursosFavoritos,
    getAllWithJoins,
    create,
    update,
    remove,
};
