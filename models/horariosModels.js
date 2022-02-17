var pool = require('./bd')

async function getHorarios(){
    var query = 'select * from horarios'
    var rows = await pool.query(query)
    return rows
}

module.exports = {getHorarios}