const avaliacaoGeralService = require('../services/AvaliacaoGeralService');

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

const getlikes = async (req, res) => {
    try {
        console.log("tentou procurar as avaliacões")
        const avaliacoes = await avaliacaoGeralService.getLikes(req.query.curso_id);
        const resposta =
        {
            codigo: 200,
            objeto: avaliacoes,
            mensagem: 'Avaliações encontradas!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado uma avaliação com este ids curso: ${req.query.cursoId}!`,
            error: err.toString(),
        });
    }
}

const getByIdCursoUsuario = async (req, res) => {
    console.log("tentou procurar a avaliacao com os ids: ", req.query.curso_id, " e ",req.query.usuario_id)
    try {
        const avaliacao = await avaliacaoGeralService.getByIdCursoUsuario(req.query.curso_id, req.query.usuario_id);
        const resposta =
        {
            codigo: 200,
            objeto: avaliacao,
            mensagem: 'Avaliação encontrada!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        console.log("erro ", err)
        res.status(404).json({
            message: `Não foi encontrado uma avaliação com estes ids: curso:${req.query.curso_id} e usuário: ${req.query.usuario_id}!`,
            error: err.toString(),
        });
    }
}

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

const create = async ({ body }, res) => {
    try {
        const newAvaliacaoGeral = await avaliacaoGeralService.create(body);
        let resposta =
        {
            codigo: 201,
            objeto: newAvaliacaoGeral,
            mensagem: 'Avaliação geral criada com sucesso!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Não foi possível criar uma nova avaliação geral!',
            error: err.toString(),
        });
    }
};

const update = async (req, res) => {
    try {
        const updatedAvaliacaoGeral = await avaliacaoGeralService.update(req.body);
        let resposta =
        {
            codigo: 201,
            objeto: updatedAvaliacaoGeral,
            mensagem: 'Avaliação geral criada com sucesso!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        console.log(err)
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
    getByIdCursoUsuario,
    getlikes,
    getAll,
    create,
    update,
    remove,
};