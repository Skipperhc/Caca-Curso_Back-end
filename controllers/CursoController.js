const dbCurso = require('../db/dbCurso')
const Curso = require('../models/curso/Curso')

async function getCursos() {
    return await dbCurso.selectCursos();
}

async function gravarCurso(Curso) {
    if (Curso.nome == undefined) {
        throw new Error('Informe o nome do curso');
    }

    if (Curso.link == undefined) {
        throw new Error('Informe o link do curso');
    }

    return await dbCurso.insertCurso(Curso);
}

module.exports = 
{
    getCursos,
    gravarCurso
}