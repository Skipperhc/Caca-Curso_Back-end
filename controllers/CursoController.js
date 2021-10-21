const cursoService = require('../services/CursoService');

const getById = async (req, res) => {
    try {
        const curso = await cursoService.getById(req.params.Id);
        res.status(200).json(curso);
    } catch (err) {
        res.status(404).json({
            message: `Não foi encontrado um curso com este id: ${req.params.Id}`,
            error: err.toString(),
        });
    }
};

const getAll = async (req, res) => {
    try {
        const cursos = await cursoService.getAll();
        res.status(200).json(cursos);
    } catch (err) {
        res.status(404).json({
            message: `Erro ao buscar cursos`,
            error: err.toString(),
        });
    }
};

const create = async ({body}, res) => {
    try {
        const curso = {
            Nome: body.nome,
            Link: body.link,
            TemaPrincipal: body.temaPrincipal,
            UrlImagem: body.urlImagem ? body.urlImagem : "",
            Keywords: body.keywords ? body.keywords : "",
        };

        console.log(curso)

        const newCurso = await cursoService.create(curso);
        res.status(200).json(newCurso);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível criar um novo curso!',
            error: err.toString(),
        });
    }
};

const update = async (req, res) => {
    try {
        const updatedAccount = await cursoService.updateAccount(req.body);
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
        const removedAccount = await cursoService.removeAccount(req.params.id);
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
