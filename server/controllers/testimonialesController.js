const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) =>{
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales: testimoniales
    });
}

exports.guardarTestimonial = async (req, res) =>{
    // validar los campos completos
    let {nombre, correo, mensaje} = req.body;

    let errores = []
    if(!nombre){
        errores.push({'mensaje' : 'Agregar tu Nombre'})
    }
    if(!correo){
        errores.push({'mensaje' : 'Agregar tu Correo'})
    }
    if(!mensaje){
        errores.push({'mensaje' : 'Agregar tu Mensaje'})
    }
    //Revisar errores
    if(errores.length > 0){
        const testimoniales = await Testimonial.findAll();
        //Muestra la vista con errores
        res.render('testimoniales', {
            errores: errores,
            nombre : nombre,
            correo: correo,
            mensaje: mensaje
        });
        
    }else{
        //Guardo en base de datos
        Testimonial.create({
            nombre: nombre, 
            correo: correo, 
            mensaje: mensaje
        })
            .then(testimonial=>{
                res.redirect("/testimoniales")
            })
            .catch(error=>console.log(error))
    }
}