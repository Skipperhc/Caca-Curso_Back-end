const avaliacaoGeralService = require('../services/AvalicaoService');

const getById = async (req, res) => {
    try {
        const avaliacaoGeral = await avaliacaoGeralService.getById(req.params.Id);
        res.status(200).json(avaliacaoGeral);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado uma avaliação geral com este id: ${req.params.Id}!`,
            error: err.toString(),
        });
    }
};

const getAll = async (req, res) => {
    try {
        const avaliacoesGerais = await avaliacaoGeralService.getAll();
        res.status(200).json(avaliacoesGerais);
    } catch (err) {
        res.status(404).json({
            message: `Erro ao buscar avaliações gerais!`,
            error: err.toString(),
        });
    }
};

const create = async ({body}, res) => {
    try {
        const avaliacaoGeral = {
            Usuario_id: body.usuario_id,
            Curso_id: body.curso_id,
            AvaliacaoGeral: body.avaliacaoGeral,
        };

        const newAvaliacaoGeral = await avaliacaoGeralService.create(avaliacaoGeral);
        res.status(200).json(newAvaliacaoGeral);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível criar uma nova avaliação geral!',
            error: err.toString(),
        });
    }
};

const update = async (req, res) => {
    try {
        const updatedAvaliacaoGeral = await avaliacaoGeralService.update(req.body);
        res.status(200).json(updatedAvaliacaoGeral);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível alterar esta avaliação geral!',
            error: err.toString(),
        });
    }
};

const remove = async (req, res) => {
    try {
        const removedAvaliacaoGeral = await avaliacaoGeralService.remove(req.params.id);
        res.status(200).json(removedAvaliacaoGeral);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível remover esta avaliação geral!',
            error: err.toString(),
        });
    }
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};