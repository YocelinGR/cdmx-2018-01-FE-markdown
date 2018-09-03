#!/usr/bin/env node
const argv = require('yargs')
	.usage('Find the markdown´s urls and their state')
	.example('https://coding.pstodulka.com/2014/10/22/node-modules-as-cli/', 'URL state: OK')
	.alias('v', 'validate').describe('Show the urls finded in a md document')
	.alias('s', 'stats').describe('Show the state of each url available/not available')
	.alias('vs', 'validate stats').describe('Show metrict from de urls analisis')
	.help('h').alias('h', 'help')
	.argv;
const [, ...args] = process.argv;
const path = args[0];
const options = args[1];
console.log(`path ${path} options ${options}`);
