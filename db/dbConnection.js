//connection PP

require('dotenv/config');

async function connect() {
    if (global.connection && global.connection.stat !== 'disconected')
        return global.connection

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://" + process.env.userDb + ":" + process.env.passwordDb + "@" + process.env.localhost + ":3306/cacacurso");
    console.log("Conectou ao mysql");
    global.connection = connection;
    return connection;
}

connect()

module.exports = { connect }

//connection PH

// async function connect() {
//     if (global.connection && global.connection.stat !== 'disconected')
//         return global.connection

//     const mysql = require('mysql2/promise');
//     const connection = await mysql.createConnection("mysql://"+process.env.userDb+":"+process.env.passwordDb+"@"+process.env.localhost+":3306/cacacurso");
//     console.log("Conectou ao mysql");
//     global.connection = connection;
//     return connection;
// }

// module.exports = {connect}
