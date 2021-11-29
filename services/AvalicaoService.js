const models = require('../models');

const getById = async (avaliacao_Id) => {
    const usuario = await models.Avaliacao.findOne({
        where: {
            Id: parseInt(avaliacao_Id),
        },
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    return usuario;
};

const getByIdCursoUsuario = async (cursoId, usuarioId) => {
    const avaliacao = await models.Avaliacao.findOne({
        where: {
            Curso_id: cursoId,
            Usuario_id: usuarioId,
        },
    });

    if (!avaliacao) {
        return null
    }

    return avaliacao;
};

// exemplo com select entre tabelas
const getAllWithJoins = async () => {
    const avaliacoes = await models.Avaliacao.findAll({
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

    if (!avaliacoes) {
        throw new Error('Erro ao tentar encontrar as avaliações!');
    }

    return avaliacoes;
};

const getAll = async () => {
    const avaliacoes = await models.Avaliacao.findAll();

    if (!avaliacoes) {
        throw new Error('Erro ao buscar pelas avaliações!');
    }

    return avaliacoes;
};

const create = async (avaliacao) => {
    const avaliacaoExistente = await getByIdCursoUsuario(avaliacao.Curso_id, avaliacao.Usuario_id)
    if (avaliacaoExistente) {
        return avaliacaoExistente
    } else {
        const newAvaliacaoGeral = await models.Avaliacao.create(avaliacao);
        return newAvaliacaoGeral;
    }
};

const update = async (avaliacao) => {
    const updatedAvaliacao = await models.Avaliacao.update(avaliacao, {
        where: {
            Id: avaliacao.AvaliacaoId,
        },
    });

    if (updatedAvaliacao[0] > 0) {
        return updatedAvaliacao
    } else {
        throw new Error('Não encontrada ou atualizada!');
    }
};

const remove = async (avaliacao_Id) => {
    const removedAvaliacao = await models.Avaliacao.destroy({
        where: {
            Id: parseInt(avaliacao_Id),
        },
    });

    if (removedAvaliacao > 0) {
        return {
            avaliacao_Id,
            message: 'Avaliação excluida com sucesso!',
        };
    } else {
        throw new Error('Não encontrada ou excluida!');
    }
};

module.exports = {
    getById,
    getAll,
    getByIdCursoUsuario,
    getAllWithJoins,
    create,
    update,
    remove,
};
