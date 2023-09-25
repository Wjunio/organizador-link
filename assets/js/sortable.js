$(function () {
    $("#sortable, .group-individual, .group-links").sortable({
        update: function(event, ui){

            let newList = [];
           
            
            let divisores = document.querySelectorAll('#sortable > .group ');

            divisores.forEach(divisor => {

                let open = divisor.querySelector("input.star-check").checked;
                let titulo = divisor.querySelector("h3").innerText;
                let isApresentargis = divisor.querySelector("input.grupo-gis") != null;
                let gis = isApresentargis ? divisor.querySelector("input.grupo-gis").value : null;
    
                let newDivisor = {
                    "isApresentargis": isApresentargis,
                    "gis": gis,
                    "titulo": titulo,
                    "open": open,
                    "grupos": []
                }

                let agupadores = divisor.querySelectorAll(".group-individual > .group1");

                if(agupadores.length > 0) {

                    agupadores.forEach(grupo => {

                        let nome = grupo.querySelector(".header-grupo > h3").innerText;
        
                        let agrupador = {
                            "nome": nome,
                            "links": [],
                        }


                        let grupoLinks = grupo.querySelectorAll(".group-links  > span.box-link");

                        if(grupoLinks.length > 0) {

                            grupoLinks.forEach(lk => {

                                let desc = lk.querySelector(".descricaoLink").innerText;
                                let hrf = lk.querySelector(".descricaoLink").href;
        
                                let link = {
                                    "descricao": desc,
                                    "link": hrf,
                                }
    
                                agrupador.links.push(link);
                                
                            });

                        }
    
                        newDivisor.grupos.push(agrupador);
                        
                    });

                }


                newList.push(newDivisor);
                
            });

            atualizarLocalStorage(newList);

        }
    });
});