const express = require('express');
const Logica = require('../Modelo/Logica');
const http = require('http');
const fileUpload = require('express-fileupload');

const app = express()
app.use(fileUpload())

app.post('/upload', (req, res) => {
    let archivosSubidos = req.files.file;
    archivosSubidos.forEach(element => {
        element.mv(`../../comprimidos/${element.name}`, err => {
            if (err) return res.status(500).send({ message: err })
        })
    });
    let cargaInformacion = new Logica.Logica();
    cargaInformacion.leerDirectoriosZip();
    return res.status(200).send({ message: 'File upload' })

    // return res.status(200).send({flag:true});
})


http.createServer(app).listen(8001, () => {
    console.log('Server started at http://localhost:8001');
});