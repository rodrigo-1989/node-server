
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const nombreCorto = archivo.name.split('.');
        const extension = nombreCorto[nombreCorto.length - 1];

        if (!extensionesValidas.includes(extension)) {
           return reject(`Extensión: ${extension} NO válida, extensiones permitidas- ${extensionesValidas}`);
        }

        const nombreTemporal = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemporal);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve( nombreTemporal );
        });
    })
}

module.exports =  subirArchivo 