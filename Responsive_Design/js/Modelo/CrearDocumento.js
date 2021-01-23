var fs = require('fs');
const AdmZip = require('adm-zip');
var base64 = require('file-base64');

class CrearDocumento {

    constructor() { }

    crearArchivo(nomRuta, textoArchivo) {
        // let creado = true;
        fs.writeFileSync(nomRuta, textoArchivo, function (err) {
            if (err) return false;
        });
        return true;
    }

    crearZip(rutaParaComprimir) {
        var zip = new AdmZip();
        const archivos = fs.readdirSync(rutaParaComprimir);
        archivos.forEach(element => {
            let rutaTemporal = rutaParaComprimir + "/" + element;
            if (rutaTemporal.toString().includes(".html") || rutaTemporal.toString().includes(".js")) {
                zip.addLocalFile(rutaTemporal);
            }
            else {
                zip.addLocalFolder(rutaTemporal);
            }
        });
        var willSendthis = zip.toBuffer();
        zip.writeZip(rutaParaComprimir + ".zip");
        fs.rmdirSync(rutaParaComprimir, { recursive: true });
        return rutaParaComprimir;
    }
}
module.exports.CrearDocumento = CrearDocumento;