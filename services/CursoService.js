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
    const updatedAccount = await models.Accounts.update(account, {
        where: {
            account_number: account.account_number,
        },
    });

    if (updatedAccount[0] > 0) {
        return {
            ...account,
            message: 'Account updated successfully!',
        };
    } else {
        throw new Error('Not Found or Updated!');
    }
};

const remove = async (account_number) => {
    const removedAccount = await models.Accounts.destroy({
        where: {
            account_number: parseInt(account_number),
        },
    });

    if (removedAccount > 0) {
        return {
            account_number,
            message: 'Account removed successfully!',
        };
    } else {
        throw new Error('Not Found or Removed!');
    }
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};
