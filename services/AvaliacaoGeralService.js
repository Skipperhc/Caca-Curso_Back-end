const models = require('../models');

const getById = async (avaliacaoGeral_Id) => {
    const avaliacaoGeral = await models.AvaliacaoGeral.findOne({
        where: {
            Id: parseInt(avaliacaoGeral_Id),
        },
    });

    if (!avaliacaoGeral) {
        throw new Error('Avaliação geral não encontrada!');
    }

    return avaliacaoGeral;
};

// exemplo com select entre tabelas
const getAllWithJoins = async () => {
    const avaliacoesGerais = await models.AvaliacaoGeral.findAll({
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

    if (!avaliacoesGerais) {
        throw new Error('Erro ao tentar encontrar as avaliações gerais!');
    }

    return avaliacoesGerais;
};

const getAll = async () => {
    const avaliacoesGerais = await models.AvaliacaoGeral.findAll();

    if (!avaliacoesGerais) {
        throw new Error('Erro ao buscar pelas avaliações gerais!');
    }

    return avaliacoesGerais;
};

const create = async (avaliacaoGeral) => {
    const newAvaliacaoGeral = models.AvaliacaoGeral.create(avaliacaoGeral);
    return newAvaliacaoGeral;
};

const update = async (avaliacaoGeral) => {
    const updatedAvaliacaoGeral = await models.AvaliacaoGeral.update(avaliacaoGeral, {
        where: {
            Id: avaliacaoGeral.Id,
        },
    });

    if (updatedAvaliacaoGeral[0] > 0) {
        return {
            ...avaliacaoGeral,
            message: 'Avaliação geral atualizada com sucesso!',
        };
    } else {
        throw new Error('Não encontrada ou atualizada!');
    }
};

const remove = async (avaliacaoGeral_Id) => {
    const removedAvaliacaoGeral = await models.AvaliacaoGeral.destroy({
        where: {
            Id: parseInt(avaliacaoGeral_Id),
        },
    });

    if (removedAvaliacaoGeral > 0) {
        return {
            avaliacaoGeral_Id: avaliacaoGeral_Id,
            message: 'Avaliação geral excluida com sucesso!',
        };
    } else {
        throw new Error('Não encontrada ou excluida!');
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
