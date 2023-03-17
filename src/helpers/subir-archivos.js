const path = require('path');
const { v4: uuid4} = require('uuid');
const subirArchivo = (archivos, carpeta = '') => {

    return new Promise((resolve, reject) => {
        const {archivo} = archivos;
        const extension = archivo.name.split('.').pop();

        const nombreTemporal = `${uuid4()}.${extension}`;
        const directorioSubida = path.join(__dirname, '../../uploaded/', carpeta, nombreTemporal);


        archivo.mv(directorioSubida, (err) => {
            if (err) {
                reject(err)
            }

            resolve({
                nombre: nombreTemporal
            });
        });
    });

}


module.exports = {
    subirArchivo
}