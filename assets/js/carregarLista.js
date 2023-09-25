function carregarJSON() {

    const fileInput = document.getElementById("fileInput");
    
    // Verifique se um arquivo foi selecionado
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Verifique se o arquivo selecionado é do tipo JSON
        if (file.type === "application/json") {
            const leitor = new FileReader();

            leitor.onload = function (e) {
                try {
                    // Parseie o conteúdo JSON
                    const conteudoJSON = JSON.parse(e.target.result);

                    localStorage.setItem("linksFavoritos", JSON.stringify(conteudoJSON));
                    location.reload();

                } catch (error) {
                    console.log(error);
                    location.reload();
                }
            };

            // Leia o arquivo como texto
            leitor.readAsText(file);
        } else {
            console.log("Por favor, selecione um arquivo JSON.");
        }
    } else {
        console.log("Por favor, selecione um arquivo.");
    }
}