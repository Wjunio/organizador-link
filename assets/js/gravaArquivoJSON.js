let nomeArquivo = 'linkFavorito';

$(function() {

    $("#upateJson").on( "click", function() {

        let linkFavorito = localStorage.getItem("linksFavoritos");
        
        let blob = new Blob( [linkFavorito] , {type: "text/plain;charset=utf-8"} );
        saveAs(blob,nomeArquivo+".json");
    });
});
