// (async () => {
//     const db = require('./db/dbCurso')

//     // console.log('Insert no banco');
//     // const resultInsert = await db.insertAuthor({nome: 'Vitor', localidade: 'Curitiba'})
//     // console.log(resultInsert)

//     // const resultDelete = await db.deleteAuthor(4);
//     // console.log(resultDelete)

//     let curso = {
//         nome: "Varios Cursos",
//         link: 'https:curso',
//         temaPrincipal: 'java',
//         horas: 33,
//         keywords: 'java, spring boot,',
//         likes: 11,
//         dislikes: 22
//     }

//     // const resultUpdate = await db.insertVariosCurso([curso, curso, curso])
//     // console.log(resultUpdate)

//     // const resultUpdate = await db.selectCursoId(1);
//     // resultUpdate.comentarios.forEach(item => {
//     //     console.log(item)
//     // });

//     // resultUpdate.curso.forEach(item => {
//     //     console.log(item)
//     // });

//     // const resultUpdate = await db.updateCurso(1, curso)
//     // console.log(resultUpdate)

//     // const resultDelete = await db.deleteCurso(1);
//     // console.log(resultDelete)

//     console.log("SELECT * FROM curso");
//     const cursos = await db.selectCursos();
//     console.log(cursos);

// })();

(async () => {
    const db = require('./db/dbUsuario')

    console.log('Insert no banco');
    const resultInsert = await db.insertUsuario({nome: 'Vitor', localidade: 'Curitiba'})
    console.log(resultInsert)

    // const resultDelete = await db.deleteAuthor(4);
    // console.log(resultDelete)

    let usuario = {
        nome: "Usuario",
        email = "pedrinhr03@gmail.com",
        idThirdParty = "123654",
        imageUrl = "NULL",
        provider = "Google"
    }

    // const resultUpdate = await db.selectUsuarioId(1);
    // resultUpdate.comentarios.forEach(item => {
    //     console.log(item)
    // });

    // resultUpdate.curso.forEach(item => {
    //     console.log(item)
    // });

    // const resultUpdate = await db.updateUsuario(1, curso)
    // console.log(resultUpdate)

    // const resultDelete = await db.deleteUsuario(1);
    // console.log(resultDelete)

    console.log("SELECT * FROM Usuario");
    const cursos = await db.selectUsuarios();
    console.log(cursos);

})();