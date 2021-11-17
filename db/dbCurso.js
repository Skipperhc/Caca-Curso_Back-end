const { connect } = require('./dbConnection')

async function selectCursos() {
    const conn = await connect();
    const rows = await conn.query('SELECT * FROM Curso');

    console.log(rows);

    return rows.rows;
}

async function selectCursosByTemaOrKeywords(tema) {
    const conn = await connect();
    const rows = await conn.query(`SELECT * FROM Curso where temaPrincipal like('%${tema}%') or keywords like('%${tema}%')`);

    console.log(rows[0]);

    return rows[0];
}

async function selectCursoId(id) {
    const conn = await connect();
    const [cursosResult] = await conn.query('SELECT * FROM Curso where idCurso=' + id);
    const [avaliacoesResult] = await conn.query('SELECT * FROM Avaliacao where idCurso=' + id);
    return { curso: cursosResult, comentarios: avaliacoesResult};
}

// idUsuario, idCurso, comentario, dataComentario
// email, nome, idThirdParty, imageUrl, provider

async function insertCurso({nome, link, temaPrincipal, horas, keywords, descricao, provider}) {
    const conn = await connect();
    const sql = 'INSERT INTO Curso(nome, link, temaPrincipal, horas, keywords, descricao, provider) VALUES (?,?,?,?,?,?,?);';
    const values = [nome, link, temaPrincipal, horas, keywords, descricao, provider]

    let linhasAfetadas = 0;
    const retornoBanco = await conn.query(sql, values, (err,result) => {
        if(err) throw err;
    });

    linhasAfetadas = retornoBanco[0].affectedRows;

    return linhasAfetadas;
}

async function insertVariosCurso(cursos) {
    const conn = await connect();
    let arrArrays = [];
    cursos.forEach((obj, index, array) => {
        let objArr = [];
        Object.keys(obj).forEach(function (item) {
            objArr.push(obj[item])
        });
        arrArrays.push(objArr)
    })
    const sql = 'INSERT INTO Curso(nome, link, temaPrincipal, horas, keywords, descricao, provider) VALUES ?;';
    return await conn.query(sql, [arrArrays], (err) => {
        if(err) throw err;
    })
}

async function updateCurso(id, {nome, link, temaPrincipal, horas, keywords, descricao, provider}) {
    const conn = await connect();
    const sql = 'UPDATE Curso SET nome=?, link=?, temaPrincipal=?, horas=?, keywords=?, descricao=?, provider=? WHERE idCurso=?';
    const values = [nome, link, temaPrincipal, horas, keywords, likes, dislikes, id];
    return await conn.query(sql, values, (err) => {
        if(err) throw err;
    })
}

async function deleteCurso(id) {
    const conn = await connect();
    const sql = 'DELETE FROM Curso where idCurso=?';
    return await conn.query(sql, [id], () => {
        if(err) throw err;
    });
}

module.exports = {
    selectCursos,
    selectCursosByTemaOrKeywords,
    insertCurso,
    insertVariosCurso,
    updateCurso,
    deleteCurso,
    selectCursoId
}