const GenerarHtml = require('./GenerarHtml.js');
const CrearDocumento = require('./CrearDocumento.js');
const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');
let pathComprimidos = "../../comprimidos";
let pathDescomprimidos = "../../descomprimido/";
let contador = 0;
let documentosHtmlEncontrados = [];

function leerDirectoriosZip() {
    fs.readdir(pathComprimidos, function (err, archivos) {
        if (err) {
            onError(err);
            return;
        }

        let totalArchivos = archivos.length;
        console.log("Entra");
        archivos.forEach(element => {
            leerZipIndividual(element, totalArchivos);
        });
    });
}

function leerZipIndividual(nomZip, totalZip) {
    let nomCarpetaDescomprimida = pathDescomprimidos + nomZip.split(".")[0];
    fs.mkdir(nomCarpetaDescomprimida, function (e) {
        var zip = new AdmZip(pathComprimidos + "/" + nomZip);
        setTimeout(() => {
            zip.extractAllTo(nomCarpetaDescomprimida, true);
            logicaHtml(totalZip);
        }, 2000);
    });
}


function logicaHtml(totalZip) {
    contador++;
    if (contador == totalZip) {
        fromDir(pathDescomprimidos, '.html');
        let documentoCreado = crearDocumentoHtml();
        if (documentoCreado) {
            console.log("Todo funciono bien");
        }
        else{
            console.log("Algo salio mal");
        }
    }
}

function fromDir(startPath, filter) {

    if (!fs.existsSync(startPath)) {
        console.log("Directorio no existe => " + startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
            documentosHtmlEncontrados.push(filename);
        };
    };
};

function crearDocumentoHtml() {
    let crearHtml = new GenerarHtml.GenerarHtml();
    let crearDocumento = new CrearDocumento.CrearDocumento();

    let documentosHtml = [];
    documentosHtmlEncontrados.forEach(element => {
        let pathParseado = element.split("\\");
        let nomArchivo = pathParseado[documentosHtmlEncontrados.length-1];
        let nomDocumento = nomArchivo.split(".")[0];
        let dimensiones = pathParseado[2].split("x");
        pathParseado.splice(0,2);
        let pathArchivo = pathParseado.join("\\");
        documentosHtml.push({id:'componente_'+nomDocumento,docHtml:pathArchivo,width:dimensiones[0],height:dimensiones[1]});
    });
    let xData = crearHtml.crearArchivoHtml(documentosHtml);
    let archivoCreado = crearDocumento.crearArchivo(pathDescomprimidos+"/index.html",xData)
    if (archivoCreado) {
        return true;
    }
    return false;
}

leerDirectoriosZip();