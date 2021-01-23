const GenerarHtml = require('./GenerarHtml.js');
const CrearDocumento = require('./CrearDocumento.js');
const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');

class Logica {

    constructor(pathComprimido, pathDescomprimido, pathLogicaIndex,identificador) {
        this.pathComprimidos = pathComprimido;
        this.pathDescomprimidos = pathDescomprimido;
        this.pathLogicaIndex = pathLogicaIndex;
        this.contador = 0;
        this.documentosHtmlEncontrados = [];
        this.idTransaccion = identificador;
    }

    leerDirectoriosZip() {
        try {
            const archivos = fs.readdirSync(this.pathComprimidos);
            archivos.forEach(element => {
                let nombreCarpeta = element.split(".")[0];
                let rutaSalida = this.pathDescomprimidos+"/"+this.idTransaccion+"/";

                if (!fs.existsSync(this.pathDescomprimidos)) {
                    fs.mkdirSync(this.pathDescomprimidos);
                }

                if (!fs.existsSync(rutaSalida)) {
                    fs.mkdirSync(rutaSalida);
                }

                let zip = new AdmZip(this.pathComprimidos + "/" + element);
                zip.extractAllTo(rutaSalida+"/"+nombreCarpeta, true);
            });
            return this.logicaHtml();
        }
        catch (error) {
            console.log(error);
            return { flag: false, sMsg: "Ocurrio un error inesperado al leer el directorio de los archivos comprimidos" };
        }
    }

    logicaHtml() {
        this.fromDir(this.pathDescomprimidos+"/"+this.idTransaccion, '.html');
        let documentoCreado = this.crearDocumentoHtml();
        if (documentoCreado.flag) {
            return { flag: false, sMsg: "Todo funciono bien",pathFolder:documentoCreado.pathFolder };
        }
        return { flag: false, sMsg: "Ha ocurrido un error" };
    }

    fromDir(startPath, filter) {
        if (!fs.existsSync(startPath)) {
            console.log("Directorio no existe => " + startPath);
            return;
        }
        var files = fs.readdirSync(startPath);
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                this.fromDir(filename, filter); //recurse
            }
            else if (filename.indexOf(filter) >= 0) {
                this.documentosHtmlEncontrados.push(filename);
            };
        };
    };

    crearDocumentoHtml() {
        let crearHtml = new GenerarHtml.GenerarHtml();
        let crearDocumento = new CrearDocumento.CrearDocumento();

        let documentosHtml = [];
        this.documentosHtmlEncontrados.forEach(element => {
            let pathParseado = element.split("\\");
            let idDocumento = pathParseado[4];
            let dimensiones = pathParseado[4].split("x");
            pathParseado.splice(0, 5);
            let pathArchivo = pathParseado.join("\\");
            documentosHtml.push({ id: 'componente_' + idDocumento, docHtml: pathArchivo, width: dimensiones[0], height: dimensiones[1] });
        });
        let xData = crearHtml.crearArchivoHtml(documentosHtml);
        let archivoCreado = crearDocumento.crearArchivo(this.pathDescomprimidos+"/"+this.idTransaccion+"/index.html", xData)
        if (archivoCreado) {
            fs.copyFileSync(this.pathLogicaIndex,this.pathDescomprimidos+"/"+this.idTransaccion+"/LogicaIndex.js");
            let zipCreado = crearDocumento.crearZip(this.pathDescomprimidos+"/"+this.idTransaccion);
            fs.rmdir(this.pathComprimidos,{recursive:true},function() {})

            // fs.rmdirSync(this.pathComprimidos, { recursive: true });
            return {flag:true,pathFolder:zipCreado};
        }
        return {flag:false};
    }
}

module.exports.Logica = Logica;