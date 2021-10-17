//connection PP

// async function connect() {
//     if (global.connection && global.connection.stat !== 'disconected')
//         return global.connection

//     const mysql = require('mysql2/promise');
//     const connection = await mysql.createConnection("mysql://user:123123@localhost:3306/cacacurso");
//     console.log("Conectou ao mysql");
//     global.connection = connection;
//     return connection;
// }

// module.exports = {connect}

//connection PH

async function connect() {
    if (global.connection && global.connection.stat !== 'disconected')
        return global.connection

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://root:ph1234@192.168.79.128:3306/cacacurso");
    // console.log("Conectou ao mysql");
    global.connection = connection;
    return connection;
}

module.exports = {connect}