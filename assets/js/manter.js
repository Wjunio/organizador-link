$(function () {

    $(".grupo-gis").on("keypress", function(e) {

        if (e.keyCode == 13) {

            e.preventDefault();
            
            let linkFavorito = localStorage.getItem("linksFavoritos");
    
            let listaLocal = linkFavorito ? JSON.parse(linkFavorito).lista : [];
    
            let idx = listaLocal.findIndex( lt => lt.titulo == $(this).siblings('.accordion').text());
    
            listaLocal[idx].gis = $(this).val();
    
            atualizarLocalStorage(listaLocal);
        }


    });

    $(".star-check").on("click", function() {
            
        let linkFavorito = localStorage.getItem("linksFavoritos");

        let listaLocal = linkFavorito ? JSON.parse(linkFavorito).lista : [];

        let idx = listaLocal.findIndex( lt => lt.titulo == $(this).parent().siblings('.accordion').text());

        listaLocal[idx].open = $(this).is(":checked");

        atualizarLocalStorage(listaLocal);

    });

    $(".btn-excluir").on("click", function() {

        let btnSelecionado = $(this);
            
        let linkFavorito = localStorage.getItem("linksFavoritos");

        let listaLocal = linkFavorito ? JSON.parse(linkFavorito).lista : [];
        
        $( "#dialog-confirm" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Excluir": function() {

                if (btnSelecionado.hasClass("excluir-divisor")) {

                    let idx = listaLocal.findIndex( lt => lt.titulo == $(this).siblings('h3').text());
                    listaLocal.splice(idx, 1);


                } else if(btnSelecionado.hasClass("excluir-grupo")) {

                    let idx = listaLocal.findIndex( lt => lt.titulo == btnSelecionado.parent().parent().parent().siblings('.accordion').text());

                    let idxAgrupador = listaLocal[idx].grupos.findIndex( lt => lt.nome == btnSelecionado.siblings('h3').text());

                    
                    listaLocal[idx].grupos.splice(idxAgrupador, 1);

                } else {

                    let idx = listaLocal.findIndex( lt => lt.titulo == btnSelecionado.parent().parent().parent().parent().siblings('.accordion').text());

                    let headAgrupador = btnSelecionado.parent().parent().siblings('.header-grupo').text();

                    let idxAgrupador = listaLocal[idx].grupos.findIndex( lt => lt.nome == headAgrupador.substring(1, headAgrupador.length));


                    let idxLink = listaLocal[idx].grupos[idxAgrupador].links.findIndex( lt => lt.descricao == btnSelecionado.siblings('.descricaoLink').text());

                    
                    listaLocal[idx].grupos[idxAgrupador].links.splice(idxLink, 1);
                }

                atualizarLocalStorage(listaLocal);

                $( this ).dialog( "close" );

              },
              Cancel: function() {
                $( this ).dialog( "close" );
              }
            }
          });
    });

    
    $(".btn").on("click", function() {

        let btnSelecionado = $(this).parent();

        $("#externo, #agrupador, #interno").css("display", "none");

        if (btnSelecionado.hasClass("posicao-button-externo")) {

            $(".mask").addClass("active");
            $("#externo").css("display", "block");
            $("#sortable").addClass("manipulando");

        } else if(btnSelecionado.hasClass("posicao-button-interno")) {

            $(".mask").addClass("active");
            $("#interno").css("display", "block");
            btnSelecionado.siblings('.group-links').addClass("manipulando");

        } else {

            $(".mask").addClass("active");
            $("#agrupador").css("display", "block");
            btnSelecionado.parent().addClass("manipulando");

        }
    });

    $(".close, .mask").on("click", function(){
        $(".mask").removeClass("active");
        $(".manipulando").removeClass("manipulando");
    });

    $(".btn-add").on("click", function() {

        
        let linkFavorito = localStorage.getItem("linksFavoritos");

        let listaLocal = linkFavorito ? JSON.parse(linkFavorito).lista : [];

        let isDadosOk = true;


        if ($(this).hasClass("btn-externo")) {

            if ($("#tituloDivisor").val().length === 0) {
                isDadosOk = msgErro("Campos Obrigatorio!!");
            }else {

                if(!listaLocal.some(lt => lt.titulo == $("#tituloDivisor").val())) {
    
                    let newDivisor = {
                        "isApresentargis": $("#isNumeroGis").is(":checked"),
                        "gis": $("#numGis").val(),
                        "titulo": $("#tituloDivisor").val(),
                        "open": $("#manterOpen").is(":checked"),
                        "grupos": []
                    }
        
                    listaLocal.push(newDivisor);
    
                }else {
                    isDadosOk = msgErro("Campo não pode repetir!!");
                }

            }
            
            
        } else if($(this).hasClass("btn-interno")) {

            let tituloPai = $(".manipulando").parent().parent().siblings('.accordion').text();

            let idx = listaLocal.findIndex( lt => lt.titulo == tituloPai);

            let tituloGrupo= $(".manipulando").siblings('.header-grupo').text();

            let idxGrupo = listaLocal[idx].grupos.findIndex( gp => gp.nome == tituloGrupo.substring(1, tituloPai.length));

            let desc = $("#descricaoUrl").val();

            let lnk = $("#link").val();

            if(!listaLocal[idx].grupos[idxGrupo].links.some( lk => lk.descricao == desc)) {

                if(desc.length === 0) {
                    isDadosOk = msgErro("Campos Obrigatorio!!");
                }else {
                    if(checkUrl(lnk) ) {
    
                        let link = {
                            "descricao": desc,
                            "link": lnk,
                        }
            
            
                        listaLocal[idx].grupos[idxGrupo].links.push(link)
    
                    }else {
                        isDadosOk = msgErro("URL invalida!");
                    }
                }
                
            } else {
                    isDadosOk = msgErro("não pode repetir");
            }
            
        } else {

            let tituloPai = $(".manipulando").siblings('.accordion').text();

            let idx = listaLocal.findIndex( lt => lt.titulo == tituloPai);

            let descricao = $("#tituloAgrupador").val();

            if(descricao.length === 0) {
                isDadosOk = msgErro("Campos Obrigatorio!!");
            }else {

                if(!listaLocal[idx].grupos.some( gp => gp.nome == descricao)) {
    
                    let item = {
                        "nome": descricao,
                        "links": [],
                    }
        
                    listaLocal[idx].grupos.push(item);
    
                }else {
                    isDadosOk = msgErro("não pode repetir");
                }
            }

        }

        if(isDadosOk) {

            atualizarLocalStorage(listaLocal);

        }
        
    });

});

function atualizarLocalStorage(listaLocal) {
    let lista = {
        "lista": listaLocal
    };

    localStorage.clear();
    localStorage.setItem("linksFavoritos", JSON.stringify(lista));
    location.reload();
}

function handleGis(cb) {
    $('#numGis').attr('disabled', !cb.checked);
}

function checkUrl(string) {
    let isUrl = false;
    try {
        new URL(string);
        isUrl = true;
    } catch (err) {
        console.log("Invalid URL!")
    }
    return isUrl;
}

function msgErro(string) {
    alert(string);
    return false;
}