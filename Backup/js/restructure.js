$(document).ready(function () {
  $("svg").each(function () {
    let padre = $(this).parent();
    //Clases de los rectangulos
    let rectangulos = $(this).find("rect");
    if (rectangulos.length>0) {
      let background = getRules("fill",rectangulos.css("fill"));
      padre.css(background.name,background.default);
      $(this).remove();
    }

    //Clases de los elipses
    let elipses = $(this).find("ellipse");
    if (elipses.length>0) {
      let background = getRules("fill",elipses.css("fill"));
      padre.css(background.name,background.default);
      padre.css("border-radius","25px 25px 25px 25px");
      padre.css("filter",$(this).css("filter"))
      $(this).remove();
    }

    //Clases de los dibujos
    // let pathSvg = $(this).find("path");
    // if (pathSvg.length>0) {
    //   let background = getRules("fill",pathSvg.css("fill"));
    //   padre.css(background.name,background.default);
    //   padre.css("d",pathSvg.css("d"));
    //   let stroke = getRules("stroke","");
    //   stroke.forEach(element => {
    //     padre.css(element.name, element.default);
    //   });
    //   $(this).remove();
    //   // console.log(pathSvg.attr("id"));
    // }
  })
});
