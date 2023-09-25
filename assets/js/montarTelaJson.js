$(function () {
    let linkFavorito = localStorage.getItem("linksFavoritos");

    if (testarJSON(linkFavorito)) {

        // Chame a função para criar os elementos HTML
        criarElementosHTML(JSON.parse(linkFavorito));

    } else {
        alert("Lista vazia ou não e um JSON");
    }
});

function testarJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object" && o !== null) return o;
    }
    catch (e) { }
    return false;
};

// Função para criar os elementos HTML com base nos dados do JSON
function criarElementosHTML(linkFavorito) {

    var conteudo = document.getElementById("sortable");

    linkFavorito.lista.forEach(function (item) {
        var groupDiv = document.createElement("div");
        groupDiv.classList.add("group");

        if(item.open) {
            groupDiv.classList.add("manterActive");
        } 
        
        var favorito = document.createElement("div");
        favorito.classList.add("star-container");
        
        var inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.name = "star-check";
        inputElement.classList.add("star-check");
        inputElement.title = "Manter Aberto";
        inputElement.checked = item.open;
        
        favorito.appendChild(inputElement);

        var aExcluir = document.createElement("a");
        aExcluir.classList.add("btn-excluir");
        aExcluir.classList.add("excluir-divisor");
        aExcluir.title = "Excluir";
        aExcluir.textContent = "x";

        var gisGrupo = document.createElement("input");
        gisGrupo.classList.add("grupo-gis");
        gisGrupo.type = "text"; 
        gisGrupo.value = item.gis ? item.gis : "";

        var h3 = document.createElement("h3");
        h3.classList.add("accordion");
        h3.textContent = item.titulo;

        var groupIndividual = document.createElement("section");
        groupIndividual.classList.add("group-individual");

        var posicaoButton = document.createElement("section");
        posicaoButton.classList.add("posicao-button");

        var button = document.createElement("button");
        button.classList.add("btn");
        button.title = "Adicionar novo grupo";
        button.textContent = " + ";

        posicaoButton.appendChild(button);
        groupIndividual.appendChild(posicaoButton);

        if (item.grupos) {
            item.grupos.forEach(function (grupo) {

                var group1Div = document.createElement("div");
                group1Div.classList.add("group1");                

                var headerGrupo = document.createElement("span");
                headerGrupo.classList.add("header-grupo")

                var aExcluirGrupo = document.createElement("a");
                aExcluirGrupo.classList.add("btn-excluir");
                aExcluirGrupo.classList.add("excluir-grupo");
                aExcluirGrupo.title = "Excluir";
                aExcluirGrupo.textContent = "x";

                var h3Grupo = document.createElement("h3");
                h3Grupo.textContent = grupo.nome;

                headerGrupo.appendChild(aExcluirGrupo);
                headerGrupo.appendChild(h3Grupo);                

                var posicaoButtonInterno = document.createElement("section");
                posicaoButtonInterno.classList.add("posicao-button", "posicao-button-interno");

                var buttonInterno = document.createElement("button");
                buttonInterno.classList.add("btn");
                buttonInterno.title = "Adicionar novo link";
                buttonInterno.textContent = " + ";

                var groupLinks = document.createElement("span");
                groupLinks.classList.add("group-links");

                if (grupo.links) {
                    grupo.links.forEach(function (link) {

                        var boxLink = document.createElement("span");
                        boxLink.classList.add("box-link");

                        var excluirLink = document.createElement("a");
                        excluirLink.classList.add("btn-excluir");
                        excluirLink.title = "Excluir";
                        excluirLink.textContent = "x";


                        var a = document.createElement("a");
                        a.classList.add("descricaoLink");
                        a.href = link?.link;
                        a.target = "_blank";
                        a.textContent = link?.descricao;


                        boxLink.appendChild(excluirLink);
                        boxLink.appendChild(a);

                        groupLinks.appendChild(boxLink);
                    });
                }

                posicaoButtonInterno.appendChild(buttonInterno);
                group1Div.appendChild(headerGrupo);
                group1Div.appendChild(posicaoButtonInterno);
                group1Div.appendChild(groupLinks);
                groupIndividual.appendChild(group1Div);
            });
        }

        groupDiv.appendChild(favorito);
        groupDiv.appendChild(aExcluir);
        if(item?.isApresentargis) {
            groupDiv.appendChild(gisGrupo);
        }
        groupDiv.appendChild(h3);
        groupDiv.appendChild(groupIndividual);
        conteudo.appendChild(groupDiv);
    });
}