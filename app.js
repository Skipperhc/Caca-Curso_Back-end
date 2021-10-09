(async () => {
    const db = require('./db')

    // console.log('Insert no banco');
    // const resultInsert = await db.insertAuthor({nome: 'Vitor', localidade: 'Curitiba'})
    // console.log(resultInsert)

    const resultUpdate = await db.updateAuthor(4, { nome: 'Vitor Hainosz', localidade: 'Curitiba' })
    console.log(resultUpdate)

    const resultDelete = await db.deleteAuthor(4);
    console.log(resultDelete)

    console.log("SELECT * FROM author");
    const authors = await db.selectAuthors();
    console.log(authors);


})();