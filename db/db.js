
async function connect() {
    if (global.connection && global.connection.stat !== 'disconected')
        return global.connection

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://user:123123@localhost:3306/cacacurso");
    console.log("Conectou ao mysql");
    global.connection = connection;
    return connection;
}

async function selectAuthors() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM author');
    return rows;
}

async function insertAuthor(author) {
    const conn = await connect();
    const sql = 'INSERT INTO author(name, location) VALUES (?, ?);';
    const values = [author.nome, author.localidade]
    return await conn.query(sql, values)
}

async function updateAuthor(id, author) {
    const conn = await connect();
    const sql = 'UPDATE author SET name=?, location=? WHERE id=?';
    const values = [author.nome, author.localidade, id];
    return await conn.query(sql, values)
}

async function deleteAuthor(id) {
    const conn = await connect();
    const sql = 'DELETE FROM author where id=?';
    return await conn.query(sql, [id]);
}

module.exports = {
    selectAuthors,
    insertAuthor,
    updateAuthor,
    deleteAuthor
}