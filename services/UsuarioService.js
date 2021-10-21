const models = require('../models');

const getById = async (usuario_Id) => {
    const usuario = await models.Usuario.findOne({
        where: {
            Id: parseInt(usuario_Id),
        },
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    const cursoMap = {
        Email: usuario.nome,
        Nome: usuario.nome,
        IdThirdParty: usuario.nome,
        UrlImagem: usuario.nome,
        Provider: usuario.nome,
    };

    return cursoMap;
};

const getAll = async () => {
    const usuarios = await models.Usuario.findAll({
        include: [
            {
                as: 'avaliacoes',
                model: models.Avaliacao,
                include: {
                    as: 'Curso',
                    model: models.Curso
                }
            }
        ]
    });

    if (!usuarios) {
        throw new Error('Curso não encontrado!');
    }

    return usuarios;
};

const create = async (usuario) => {
    const newUsuario = models.Usuario.create(usuario);
    return newUsuario;
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
