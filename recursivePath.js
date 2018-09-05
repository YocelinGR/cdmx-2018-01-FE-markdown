const fs = require('fs');
const path = require('path');

function recursiveDirectory(dir){
	console.log('[+]', dir);
	let files = fs.readdirSync(dir);
	for(let file in files){
		let nextFile = path.join(dir, files[file]);
		if(fs.lstatSync(nextFile).isDirectory()==true){
			recursiveDirectory(nextFile);
		} else {
			console.log('\t', nextFile);
		}
	}
}
recursiveDirectory(__dirname);