const dbCurso = require('../db/dbCurso')

async function getCursos() {
    return await dbCurso.selectCursos();
}