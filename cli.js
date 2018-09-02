#!/usr/bin/env node
'user strict';

const mdLinks = require('mdLinks');
const mdLinksYGR = require('./');

/* Este archivo configura todos los parametros que tendra el modulo y como se manejará
el mismo desde la consola */
let cli = mdLinks([
	'examples',
	'',
	'$ mdLinks --validate',
	'',
	'$ mdLinks --stats',
	'',
	'$ mdLinks --validate --stats'
]);
console.log(cli.flags.all ? mdLinks.validate(): mdLinks.stats());

