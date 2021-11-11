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

const create = async ({body}, res) => {
    try {
        const usuarioFavoritos = {
            Usuario_id: body.usuario_id,
            Curso_id: body.curso_id,
        };

        const newUsuarioFavorito = await usuarioFavoritosService.create(usuarioFavoritos);
        res.status(200).json(newUsuarioFavorito);
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
        res.status(200).json(updatedUsuarioFavorito);
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
    getAll,
    create,
    update,
    remove,
};