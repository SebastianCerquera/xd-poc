function cambiarResolucion() {
    let widthS = screen.width;
    let heightS = screen.height;
    let componenteEscalado = "";

    $("object").each(function () {
        $(this).hide();
    })

    $("object").each(function () {
        let widthO = $(this).attr("width");
        let heightO = $(this).attr("height");
        if (widthO == widthS && heightO == heightS) {
            componenteEscalado = $(this).attr("id");
        }
    });

    $("object").each(function () {
        let idTemporal = $(this).attr("id");
        if (idTemporal == componenteEscalado) {
            $(this).show();
        }
    });
}


$(document).ready(function () {
    cambiarResolucion();
});

$(window).resize(function () {
    cambiarResolucion();
})