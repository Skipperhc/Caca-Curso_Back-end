const dbUsuario = require('../db/dbUsuario')
const Usuario = require('../models/usuario/Usuario')

async function getUsuarios() {
    return await dbUsuario.selectUsuarios();
}

async function gravarUsuario(Usuario) {
    if (Usuario.nome == undefined) {
        throw new Error('Informe o nome do usuario');
    }

    if (Usuario.email == undefined) {
        throw new Error('Informe o email do usuario');
    }

    if (Usuario.idThirdParty == undefined) {
        throw new Error('Informe o id de provedor externo do usuario');
    }

    if (Usuario.provider == undefined) {
        throw new Error('Informe o nome do provedor de login externo do usuario');
    }

    return await dbUsuario.insertUsuario(Usuario);
}

module.exports = 
{
    getUsuarios,
    gravarUsuario
}