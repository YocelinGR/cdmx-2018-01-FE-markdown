const fs = require('fs'); // Accede al CRUD de archivos desde node.js
const fetch = require('node-fetch'); // Requerir fetch para peticiones a urls
const recursive = require('recursive-readdir');
const path = require('path');
const resolve = require('path').resolve;
const rp = require('fs.realpath');

const fileSelected = 'README.md';
const options = 'validate';

const compareRoutes = (fileSelectedRoute, fileSelected) => {
	 cont = 0;
	for(let i of fileSelectedRoute){
		if(path.basename(i) == fileSelected){ cont++;
			return i;
		}
	}
	if (cont == 0) return `El archivo ${fileSelected} no existe`;
};

const ignoreFunc = (file, stats) => {
	return stats.isDirectory() && path.basename(file) == 'node_modules';
};

// Realiza las peticiones fetch a las urls para comprobar su estado
async function fetchRequest(text, url) {
	let urlsCompleteInfo;
	const respFetch = await fetch(url)
	const respStatus = await respFetch.status
			if (respStatus === 404) {
				urlsCompleteInfo = { // Retorna objeto con error
					url: url,
					status: 'Error, url rota',
					texto: text
				}
			}
			else {
				urlsCompleteInfo = { // Retorna objeto con resp exitosa
					url: url,
					status: 'Ok, url activa',
					texto: text
				}
			}
		return urlsCompleteInfo;
};
// Realiza las peticiones fetch por cada url del arreglo existente
async function httpPetitions(arrayText, arrayURL){
	try {
		let fetchPetions = [];
		for (let i=0; i<arrayURL.length; i++) {
			fetchRequest(arrayText[i], arrayURL[i])
				.then((objeto) => {
					fetchPetions.push(objeto);
					if(i == 2) console.log(fetchPetions)
				})
		}
	} catch (e){console.log('Error')}
};
// Separa linea por linea del doc .md y busca concidencias con urls
const separeteLines = (stringData) => {
	const lines = stringData.split('\n');
	const documentURL = [];
	let lineWithUrl = '';
	let urlsToString = '';
	let pureURL = '';
	let descriptionTextURL ='';
	const textFromURL = [];
	for (let i of lines){
		lineWithUrl = i.match(/(ftp|http|https|www):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi);
		if(lineWithUrl == null) {}
		else {
			descriptionTextURL = i.match(/\[([^\]]+)]/g);
			if(descriptionTextURL == null) textFromURL.push('Texto sin URL');
			else textFromURL.push(descriptionTextURL);
			urlsToString = lineWithUrl.toString();
			if(urlsToString[urlsToString.length-1] == ')'){
				pureURL = urlsToString.slice(0, -1);
				documentURL.push(pureURL);
			} else if (urlsToString[urlsToString.length-2] == ')') {
				pureURL = urlsToString.slice(0, -2);
				documentURL.push(pureURL);
			}
			else documentURL.push(urlsToString);
		}
		lineWithUrl = '';
		urlsToString = '';
		pureURL = '';
		descriptionTextURL = '';
	}
	httpPetitions(textFromURL, documentURL);
};
// Abre el documento y pide analizarlo
const goInDocument = (err, data) => {
	if(err) {
		console.log(`Archivo no encontrado. Error: ${err}`);
		return `Archivo no encontrado. Error: ${err}`;
	} else separeteLines(data);
};
const mdLinks = () => {
	let route = './';
	route = resolve(route);
	const fileSelectedRoute = recursive(route, [ignoreFunc], (err, files)=> {
		let auxMDArray = [];
		let arrayAllFiles = files;
		for (let i of arrayAllFiles){
			if(path.extname(i) == '.md') auxMDArray.push(i);
		}
		let auxRoute = compareRoutes(auxMDArray, fileSelected);
		console.log('Archivo: '+path.basename(auxRoute) +' Ruta: '+auxRoute);
		// Pasa documento,función y formato a la llamada fs readfile
		fs.readFile(auxRoute, 'utf-8', goInDocument);
	});
};
mdLinks();
module.exports = mdLinks;
