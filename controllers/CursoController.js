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
        const updated = await cursoService.update(req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({
            message: 'Não foi possível alterar este curso!',
            error: err.toString(),
        });
    }
};

// TODO: planejar como será feito a exclusão de um curso, se iremos remover somente ele, ou tudo relacionado a ele
// const remove = async (req, res) => {
//     try {
//         console.log('chegou aqui com o id', req)
//         const removed = await cursoService.remove(req.params.id);
//         res.status(200).json(removed);
//     } catch (err) {
//         res.status(500).json({
//             message: 'Não foi possível remover este curso!',
//             error: err.toString(),
//         });
//     }
// };

module.exports = {
    getById,
    getAll,
    create,
    update,
    // remove,
};
