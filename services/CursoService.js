const models = require('../models');

const getById = async (curso_Id) => {
    const curso = await models.Curso.findOne({
        where: {
            Id: parseInt(curso_Id),
        },
    });

    if (!curso) {
        throw new Error('Curso não encontrado!');
    }

    const cursoMap = {
        nome: curso.nome,
        link: curso.link,
        temaPrincipal: curso.temaPrincipal,
        UrlImagem: curso.UrlImagem ? curso.UrlImagem : "Sem imagem",
        keywords: curso.keywords ? curso.keywords : "Sem palavras chaves",
    };

    return cursoMap;
};

const getAll = async () => {
    const cursos = await models.Curso.findAll({
        include: [
            {
                model: models.Avaliacao,
                as: 'avaliacoes',
                include: {
                    as: 'Usuario',
                    model: models.Usuario
                }
            }
        ]
    });

    if (!cursos) {
        throw new Error('Curso não encontrado!');
    }

    console.log(cursos)

    return cursos;
};

const create = async (curso) => {
    console.log()
    const newCurso = models.Curso.create(curso);
    return newCurso;
};

const update = async (curso) => {
    const updatedCurso = await models.Curso.update(curso, {
        where: {
            Id: curso.Id,
        },
    });

    if (updatedCurso[0] > 0) {
        return {
            ...curso,
            message: 'Curso atualizado com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou atualizado!');
    }
};

const remove = async (curso_Id) => {
    const removedCurso = await models.Curso.destroy({
        where: {
            Id: parseInt(curso_Id),
        },
    });

    if (removedCurso > 0) {
        return {
            curso_Id,
            message: 'Curso deletado com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou deletado!');
    }
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};
