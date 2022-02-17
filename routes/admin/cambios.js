var express = require('express');
var router = express.Router();
var horariosModel = require('../../models/horariosModels');

/* Listado de horarios*/
router.get('/', async function (req,res,next){

    var horarios = await horariosModel.getHorarios();
    res.render('admin/cambios',{
        layout : 'admin/layout',
        usuario:req.session.nombre,
        horarios
    })
});

/* Vista del formulario Horarios para editar*/

router.get('/horarios/:id',async(req,res,next)=>{
    var id=req.params.id;
    var horario = await horariosModel.getDiasById(id)
    res.render('admin/horarios',{
        layout:'admin/layout',
        horario
    })

})

/* Para UPDATE*/
router.post('/horarios', async (req,res,next)=>{
    try {
        var obj={
            horarios:req.body.horarios
        }
        
        await horariosModel.editarHorarioById(obj,req.body.id)
        res.redirect('/admin/cambios');

    } catch (error) {
        console.log(error);
        res.render('admin/horarios',{
            layout:'admin/layout',
            error:true,
            message:'No se modifico la novedad'
        })
    }
})

module.exports = router;