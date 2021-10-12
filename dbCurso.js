const { connect } = require('./dbConnection')

async function selectCursos() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM curso');
    return rows;
}

async function selectCursoId(id) {
    const conn = await connect();
    const [cursosResult] = await conn.query('SELECT * FROM curso where idCurso=' + id);
    const [avaliacoesResult] = await conn.query('SELECT * FROM avaliacao where idCurso=' + id);
    return { rowsCursos: cursosResult, rowsAvaliacao: avaliacoesResult};
}

// idUsuario, idCurso, comentario, dataComentario
// email, nome, idThirdParty, imageUrl, provider

async function insertCurso({nome, link, temaPrincipal, horas, keywords, likes, dislikes}) {
    const conn = await connect();
    const sql = 'INSERT INTO curso(nome, link, temaPrincipal, horas, keywords, likes, dislikes) VALUES (?,?,?,?,?,?,?);';
    const values = [nome, link, temaPrincipal, horas, keywords, likes, dislikes]
    return await conn.query(sql, values, (err) => {
        if(err) throw err;
    })
}

async function insertVariosCurso(cursos) {
    const conn = await connect();
    const sql = 'INSERT INTO curso(nome, link, temaPrincipal, horas, keywords, likes, dislikes) VALUES ?;';
    return await conn.query(sql, [cursos], (err) => {
        if(err) throw err;
    })
}

async function updateCurso(id, {nome, link, temaPrincipal, horas, keywords, likes, dislikes}) {
    const conn = await connect();
    const sql = 'UPDATE curso SET nome=?, link=?, temaPrincipal=?, horas=?, keywords=?, likes=?, dislikes=? WHERE idCurso=?';
    const values = [nome, link, temaPrincipal, horas, keywords, likes, dislikes, id];
    return await conn.query(sql, values, (err) => {
        if(err) throw err;
    })
}

async function deleteCurso(id) {
    const conn = await connect();
    const sql = 'DELETE FROM curso where idCurso=?';
    return await conn.query(sql, [id], () => {
        if(err) throw err;
    });
}

module.exports = {
    selectCursos,
    insertCurso,
    insertVariosCurso,
    updateCurso,
    deleteCurso,
    selectCursoId
}