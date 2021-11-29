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

const getByIdCursoUsuario = async (req, res) => {
    console.log("tentou procurar a avaliacao com os ids: ", req.query.curso_id, " e ", req.query.usuario_id)
    try {
        const avaliacao = await avaliacaoService.getByIdCursoUsuario(req.query.curso_id, req.query.usuario_id);
        const resposta =
        {
            codigo: 200,
            objeto: avaliacao,
            mensagem: 'Avaliação encontrada!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado uma avaliação com estes ids: curso:${req.query.curso_id} e usuário: ${req.query.usuario_id}!`,
            error: err.toString(),
        });
    }
}

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

const create = async ({ body }, res) => {
    try {
        const newAvaliacao = await avaliacaoService.create(body);
        let resposta =
        {
            codigo: 201,
            objeto: newAvaliacao,
            mensagem: 'Avaliação criada com sucesso!'
        }
        res.status(200).json(resposta);
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
        let resposta =
        {
            codigo: 201,
            objeto: updatedAvaliacao,
            mensagem: 'Avaliação atualizada com sucesso!'
        }
        res.status(200).json(resposta);
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
    getByIdCursoUsuario,
    getAll,
    create,
    update,
    remove,
};