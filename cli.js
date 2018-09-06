#!/usr/bin/env node
const argv = require('yargs');
const program = require('commander');

program
	.version('1.1.2')
	.option('-v', '--validate', 'Valida la existencia del archivo md y las URL´s en él')
	.option('-s', '--stats', 'Muestra el estado de las URLs OK/NOT OK')
	.option('-vs', '--validate-stats', 'Muestra analiticos sobre el archivo y sus URLs')
	.parse(process.argv);
	
/* error on unknown commands
program.on('command:*', function () {
	console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
	process.exit(1);
});*/

const [, ...args] = process.argv;
const path = args[0];
const options = args[1];
console.log(`path ${path} options ${args}`);