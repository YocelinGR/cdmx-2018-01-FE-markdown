/* Este archivo es el enlace de las funcionalidades del modulo con la verificación del mismo,  
debe de contener la verificacion del arbol de archivos y pasar los parámetros de path y options 
a la funcion mdLinks que se encargará de ejecutar todos los procesos */
'use strict';
const mdLinks = require('./lib/mdLinks.js');

const mdLinks = (path, options) => {
    console.log(path);
    console.log(options);
}
module.exports = {
	mdLinks : mdLinks
};