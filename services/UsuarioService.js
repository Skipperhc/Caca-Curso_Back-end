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
        Email: usuario.Email,
        Nome: usuario.nome,
        IdThirdParty: usuario.IdThirdParty,
        UrlImagem: usuario.UrlImagem,
        Provider: usuario.Provider,
    };

    return cursoMap;
};

const getByEmail = async (usuario_Email) => {
    const usuario = await models.Usuario.findOne({
        where: {
            Email: usuario_Email
        },
    });
    
    return usuario;
};

// exemplo com include, da pra brincar bastante com isso daqui
// const getAll = async () => {
//     const usuarios = await models.Usuario.findAll({
//         include: [
//             {
//                 as: 'avaliacoes',
//                 model: models.Avaliacao,
//                 include: {
//                     as: 'Curso',
//                     model: models.Curso
//                 }
//             }
//         ]
//     });

//     if (!usuarios) {
//         throw new Error('Curso não encontrado!');
//     }

//     return usuarios;
// };

const getAll = async () => {
    const usuarios = await models.Usuario.findAll();

    if (!usuarios) {
        throw new Error('Curso não encontrado!');
    }

    return usuarios;
};

const create = async (usuario) => {
    const newUsuario = models.Usuario.create(usuario);
    return newUsuario;
};

const update = async (usuario) => {
    const updatedUsuario = await models.Usuario.update(usuario, {
        where: {
            Id: usuario.Id,
        },
    });

    if (updatedUsuario[0] > 0) {
        return {
            ...usuario,
            message: 'Usuário atualizado com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou atualizado!');
    }
};

const remove = async (usuario_Id) => {
    const removedUsuario = await models.Usuario.destroy({
        where: {
            Id: parseInt(usuario_Id),
        },
    });

    if (removedUsuario > 0) {
        return {
            usuario_Id,
            message: 'Usuário excluido com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou excluido!');
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
