const express = require('express');
const Logica = require('../Modelo/Logica');
const http = require('http');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express()
app.use(fileUpload())


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

app.post('/upload', (req, res) => {
    let rta={flag:false, sMsg:'Ocurrio un error inesperado'};
    try{
        let pathComprimidos = "../../comprimidos";
        let pathDescomprimido = "../../descomprimidos";
        let pathLogicaIndex = "../Controlador/LogicaIndex.js";
        let identificador =generateUUID();
        
        if (!fs.existsSync(pathComprimidos)) {
            fs.mkdirSync(pathComprimidos);
        }
        if (!fs.existsSync(pathComprimidos+"/"+identificador)) {
            fs.mkdirSync(pathComprimidos+"/"+identificador);
        }


        let archivosSubidos = req.files.file;
        let contador = 1;
        let logica = new Logica.Logica(pathComprimidos+"/"+identificador,pathDescomprimido,pathLogicaIndex,identificador);
    
        archivosSubidos.forEach(element => {
            element.mv(`${pathComprimidos}/${identificador}/${element.name}`, err => {
                if (err) return res.status(500).send({ message: err })
                contador++;
                if (contador == archivosSubidos.length) {
                    rta = logica.leerDirectoriosZip();
                    if (rta) {
                        res.download(pathDescomprimido+"/"+identificador+".zip");
                    }
                    // return  res.status(200).send(rta);
                }
            })
        });
    }
    catch(error){
        return res.status(200).send(rta);
    }
    // return res.status(200).send(rta);
})



http.createServer(app).listen(8001, () => {
    console.log('Server started at http://localhost:8001');
});
