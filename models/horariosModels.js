var pool = require('./bd')

async function getHorarios(){
    var query = 'select * from horarios';
    var rows = await pool.query(query);
    return rows;
}

async function getDiasById(id){
    var query = 'SELECT * FROM horarios WHERE id = ?';
    var rows = await pool.query(query,[id]);
    return rows[0];
}

async function editarHorarioById(obj,id){
    try {
        var query = 'UPDATE horarios SET ? WHERE id=?';
        var rows = await pool.query(query,[obj,id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
module.exports = {getHorarios , getDiasById , editarHorarioById}