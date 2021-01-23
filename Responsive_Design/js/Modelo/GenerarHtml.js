class GenerarHtml{

    constructor(){
    }

    crearArchivoHtml(listaArchivosHtml) {
        let xData = this.crearHeadHtml(); 
        xData+='<body>\n';
        xData+=this.incorporarDocHtml(listaArchivosHtml);
        xData+=this.cerrarHtml();
        return xData;
    }
    
    crearHeadHtml() {
        let xData = '<!DOCTYPE html>\n';
        xData+='<html lang="en">\n';
        xData+='<head>\n';
        xData+='<meta charset="UTF-8">\n';
        xData+='<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
        xData+='<title>Proyecto</title>\n';
        xData+='<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>\n';
        xData+='<script src="LogicaIndex.js"></script>\n';
        xData+='</head>\n';
        return xData;
    }
    
    incorporarDocHtml(listaArchivosHtml) {
        let xData = '';
        for (let i = 0; i < listaArchivosHtml.length; i++) {
            const docHtml = listaArchivosHtml[i].docHtml;
            const id = listaArchivosHtml[i].id;
            const width = listaArchivosHtml[i].width;
            const height = listaArchivosHtml[i].height;
            xData+='<iframe id="'+id+'" type="text/html" src="'+docHtml+'" width="'+width+'" height="'+height+'"></iframe>\n';
        }
        return xData;
    }
    
    cerrarHtml() {
        let xData='</body>\n';
        xData+='</html>';
        return xData;
    }
} 


module.exports.GenerarHtml = GenerarHtml;