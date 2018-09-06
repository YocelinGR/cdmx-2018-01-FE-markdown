let recursive = require('recursive-readdir');
const path = require('path');
const resolve = require('path').resolve;
const rp = require('fs.realpath');
const userDoc = 'README.md';

const ifDocument = (myRoute, userDoc) => {
	let cont = 0;
	for(let i=0; i<myRoute.length;i++){
		if(path.basename(myRoute[i]) == userDoc){
			// console.log(myRoute[i]);
			return myRoute[i];
			cont++;
		}
	}
	if (cont ==0){
		// console.log('El archivo '+userDoc+' no existe')
		return `El archivo ${userDoc} no existe`;
	}
};

const ignoreFunc = (file, stats) => {
	return stats.isDirectory() && path.basename(file) == 'node_modules';
};
// let ruta = 'C:/Users/YOCELIN/Documents/Laboratoria/javascript/cdmx-2018-01-FE-markdown';
// ruta = resolve(ruta);
var ruta = rp.realpathSync('./');
const myRoute = recursive(ruta, [ignoreFunc], (err, files)=> {
	let auxMDArray = [];
	let arrayAllFiles = files;
	for (let i = 0; i<arrayAllFiles.length;i++){
		if(path.extname(arrayAllFiles[i]) == '.md'){
			auxMDArray.push(arrayAllFiles[i]);
		}
	}
	let auxRoute = ifDocument(auxMDArray, userDoc);
	return auxRoute;
});