#!/usr/bin/env node
const yargs = require('yargs');
const commander = require('commander');

commander
	.version('1.1.2')
	.option('-v', '--validate', 'Valida la existencia del archivo md y las URL´s en él')
	.option('-s', '--stats', 'Muestra el estado de las URLs OK/NOT OK')
	.option('-vs', '--validate-stats', 'Muestra analiticos sobre el archivo y sus URLs')
	.parse(process.yargs);

const args = process.yargs;

switch(args[3]){
case '--validate':
	console.log('Opcion de validar');
	break;
case '--stats':
	console.log('Opcion de stats');
	break;
case '--validate-stats':
	console.log('Opcion de validate y sats');
	break;
default:
	console.log('Error');
}
