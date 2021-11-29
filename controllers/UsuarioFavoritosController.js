const usuarioFavoritosService = require('../services/UsuarioFavoritosService');

const getById = async (req, res) => {
    try {
        const usuarioFavoritos = await usuarioFavoritosService.getById(req.params.Id);
        res.status(200).json(usuarioFavoritos);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado o favorito do usuário com este id: ${req.params.Id}!`,
            error: err.toString(),
        });
    }
};

const getByIdCursoUsuario = async (req, res) => {
    console.log("tentou procurar a avaliacao com os ids: ", req.query.curso_id, " e ", req.query.usuario_id)
    try {
        const usuarioFavorito = await usuarioFavoritosService.getByIdCursoUsuario(req.query.curso_id, req.query.usuario_id);
        const resposta =
        {
            codigo: 200,
            objeto: usuarioFavorito,
            mensagem: 'Avaliação encontrada!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado um favorito com estes ids: curso:${req.query.curso_id} e usuário: ${req.query.usuario_id}!`,
            error: err.toString(),
        });
    }
}

const getAll = async (req, res) => {
    try {
        const usuarioFavoritos = await usuarioFavoritosService.getAll();
        res.status(200).json(usuarioFavoritos);
    } catch (err) {
        res.status(404).json({
            message: `Erro ao buscar pelos favoritos!`,
            error: err.toString(),
        });
    }
};

const create = async ({ body }, res) => {
    try {
        const newUsuarioFavorito = await usuarioFavoritosService.create(body);
        let resposta =
        {
            codigo: 201,
            objeto: newUsuarioFavorito,
            mensagem: 'Favorito criado com sucesso!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível criar um novo favorito do usuário!',
            error: err.toString(),
        });
    }
};

const update = async (req, res) => {
    try {
        const updatedUsuarioFavorito = await usuarioFavoritosService.update(req.body);
        let resposta =
        {
            codigo: 201,
            objeto: updatedUsuarioFavorito,
            mensagem: 'Avaliação atualizada com sucesso!'
        }
        res.status(200).json(resposta);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível alterar este favorito do usuário!',
            error: err.toString(),
        });
    }
};

const remove = async (req, res) => {
    try {
        const removedUsuarioFavorito = await usuarioFavoritosService.remove(req.params.id);
        res.status(200).json(removedUsuarioFavorito);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível remover este favorito do usuário!',
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