const { connect } = require('./dbConnection')

async function selectUsuarios() {
    const conn = await connect();
    const rows = await conn.query('SELECT * FROM Usuario');

    console.log(rows);

    return rows.rows;
}

async function selectUsuarioId(id) {
    const conn = await connect();
    const [usuarioResult] = await conn.query('SELECT * FROM Usuario where idUsuario=' + id);
    return { usuario: usuarioResult};
}

async function insertUsuario({nome, email, idThirdParty, imageUrl, provider}) {
    const conn = await connect();
    const sql = 'INSERT INTO Usuario(nome, email, idThirdParty, imageUrl, provider) VALUES (?,?,?,?,?);';
    const values = [nome, email, idThirdParty, imageUrl, provider]

    let linhasAfetadas = 0;
    const retornoBanco = await conn.query(sql, values, (err,result) => {
        if(err) throw err;
    });

    linhasAfetadas = retornoBanco[0].affectedRows;

    return linhasAfetadas;
}

async function updateUsuario(id, {nome, email, idThirdParty, imageUrl, provider}) {
    const conn = await connect();
    const sql = 'UPDATE Usuario SET nome=?, email=?, idThirdParty=?, imageUrl=?, provider=? WHERE idUsuario=?';
    const values = [nome, email, idThirdParty, imageUrl, provider, id];
    return await conn.query(sql, values, (err) => {
        if(err) throw err;
    })
}

async function deleteUsuario(id) {
    const conn = await connect();
    const sql = 'DELETE FROM Usuario where idUsuario=?';
    return await conn.query(sql, [id], () => {
        if(err) throw err;
    });
}

module.exports = {
    selectUsuarios,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectUsuarioId
}