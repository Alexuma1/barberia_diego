var express = require('express');
var router = express.Router();
var horariosModel = require('../../models/horariosModels');

router.get('/', async function (req,res,next){

    var horarios = await horariosModel.getHorarios();
    res.render('admin/cambios',{
        layout : 'admin/layout',
        usuario:req.session.nombre,
        horarios
    })
});

module.exports = router;