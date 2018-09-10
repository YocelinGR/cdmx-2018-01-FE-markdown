#!/usr/bin/env node
const argv = require('yargs');
const program = require('commander');

program
	.version('1.1.2')
	.option('-v', '--validate', 'Valida la existencia del archivo md y las URL´s en él')
	.option('-s', '--stats', 'Muestra el estado de las URLs OK/NOT OK')
	.option('-vs', '--validate-stats', 'Muestra analiticos sobre el archivo y sus URLs')
	.parse(process.argv);
	
const args = process.argv;
const pathExe = args[0];
const pathDoc = args[1];
const path = args[2];
// console.log(`path ${pathExe} options ${pathDoc}`);

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