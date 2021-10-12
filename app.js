(async () => {
    const db = require('./dbCurso')

    // console.log('Insert no banco');
    // const resultInsert = await db.insertAuthor({nome: 'Vitor', localidade: 'Curitiba'})
    // console.log(resultInsert)

    // const resultDelete = await db.deleteAuthor(4);
    // console.log(resultDelete)

    let curso = {
        nome:"Curso teste atualizado",
        link: 'https:curso', 
        temaPrincipal:'java', 
        horas:33,
        keywords: 'java, spring boot,',
        likes:11, 
        dislikes:22
    }

    // const resultUpdate = await db.insertCurso(curso)
    // console.log(resultUpdate)

    const resultUpdate = await db.selectCursoId(1);
    resultUpdate.rowsAvaliacao.forEach(item => {
        console.log(item.comentario)
    });

    resultUpdate.rowsCursos.forEach(item => {
        console.log(item.nome)
    });
    
    // const resultUpdate = await db.updateCurso(1, curso)
    // console.log(resultUpdate)

    // const resultDelete = await db.deleteCurso(1);
    // console.log(resultDelete)

    console.log("SELECT * FROM curso");
    const cursos = await db.selectCursos();
    console.log(cursos);

})();