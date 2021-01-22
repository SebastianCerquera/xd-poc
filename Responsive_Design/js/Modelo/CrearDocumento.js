var fs = require('fs');

class CrearDocumento {

    constructor() { }

    crearArchivo(nomRuta, textoArchivo) {
        // let creado = true;
        fs.writeFileSync(nomRuta, textoArchivo, function (err) {
            if (err) return false;
        });
        return true;
    }
}


module.exports.CrearDocumento = CrearDocumento;