const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consulta = async (req, res) =>{
    const promises = [];
    const viajes = await Viaje.findAll({limit: 3});
    const testimoniales = await Testimonial.findAll({limit: 3});
    
    res.render('index', {
        clase: 'home',
        viajes: viajes,
        testimoniales : testimoniales
    });
}