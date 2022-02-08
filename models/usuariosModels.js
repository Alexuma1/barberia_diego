var pool = require('./bd')
var md5 = require('md5')

async function getUserAndPassword(usuario,password){
    try {
        var query = 'SELECT * FROM usuarios WHERE usuario =? AND password =? LIMIT 1'
        var rows = await pool.query(query, [usuario,md5(password)])
        return rows[0]
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getUserAndPassword}