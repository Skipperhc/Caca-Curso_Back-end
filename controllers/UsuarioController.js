const usuarioService = require('../services/UsuarioService');

const getById = async (req, res) => {
    try {
        const usuario = await usuarioService.getById(req.params.Id);
        res.status(200).json(usuario);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado um usuário com este id: ${req.params.Id}!`,
            error: err.toString(),
        });
    }
};

const getByEmail = async (req, res) => {
    try {
        const usuario = await usuarioService.getByEmail(req.params.email);
        res.status(200).json(usuario);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado um usuário com este email: ${req.params.email}!`,
            error: err.toString(),
        });
    }
};

const getAll = async (req, res) => {
    try {
        const usuarios = await usuarioService.getAll();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(404).json({
            message: `Erro ao buscar usuários!`,
            error: err.toString(),
        });
    }
};

const create = async ({ body }, res) => {
    try {
        const usuario = {
            Email: body.email,
            Nome: body.nome,
            IdThirdParty: body.idThirdParty,
            UrlImagem: body.urlImagem ? body.urlImagem : "Sem imagem",
            Provider: body.provider,
        };

        const newUsuario = await usuarioService.create(usuario);
        res.status(200).json(newUsuario);
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
        if (Usuario.imageUrl == undefined) {
            Usuario.imageUrl = "SEM IMAGEM"
        }
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
    getByEmail,
    getAll,
    create,
    update,
    remove,
};