const avaliacaoService = require('../services/AvalicaoService');

const getById = async (req, res) => {
    try {
        const avaliacao = await avaliacaoService.getById(req.params.Id);
        res.status(200).json(avaliacao);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado uma avaliação com este id: ${req.params.Id}!`,
            error: err.toString(),
        });
    }
};

const getAll = async (req, res) => {
    try {
        const avaliacoes = await avaliacaoService.getAll();
        res.status(200).json(avaliacoes);
    } catch (err) {
        res.status(404).json({
            message: `Erro ao buscar avaliações!`,
            error: err.toString(),
        });
    }
};

const create = async ({body}, res) => {
    try {
        const avaliacao = {
            Usuario_id: body.usuario_id,
            Curso_id: body.curso_id,
            Comentario: body.comentario,
        };

        const newAvaliacao = await avaliacaoService.create(avaliacao);
        res.status(200).json(newAvaliacao);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível criar uma nova avaliação!',
            error: err.toString(),
        });
    }
};

const update = async (req, res) => {
    try {
        const updatedAvaliacao = await avaliacaoService.update(req.body);
        res.status(200).json(updatedAvaliacao);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível alterar esta avaliação!',
            error: err.toString(),
        });
    }
};

const remove = async (req, res) => {
    try {
        const removedAvaliacao = await avaliacaoService.remove(req.params.id);
        res.status(200).json(removedAvaliacao);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível remover esta avaliação!',
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