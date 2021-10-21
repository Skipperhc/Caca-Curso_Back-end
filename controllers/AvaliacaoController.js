const avaliacaoService = require('../services/AvalicaoService');

const getById = async (req, res) => {
    try {
        const avaliacao = await usuarioService.getById(req.params.Id);
        res.status(200).json(avaliacao);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado um usuário com este id: ${req.params.Id}!`,
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
            message: 'Não foi possível criar um novo usuário!',
            error: err.toString(),
        });
    }
};

const update = async (req, res) => {
    try {
        const updatedAccount = await cursoService.update(req.body);
        res.status(200).json(updatedAccount);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível alterar esta conta!',
            error: err.toString(),
        });
    }
};

const remove = async (req, res) => {
    try {
        const removedAccount = await cursoService.remove(req.params.id);
        res.status(200).json(removedAccount);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível remover esta conta!',
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