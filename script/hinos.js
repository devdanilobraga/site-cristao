function lerPDF(url, callback) {
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        var texto = '';
        var numPaginas = pdf.numPages;

        for (var i = 1; i <= numPaginas; i++) {
            pdf.getPage(i).then(function (page) {
                page.getTextContent().then(function (textContent) {
                    var pageText = textContent.items.map(function (item) {
                        return item.str;
                    }).join(' ');

                    texto += pageText;

                    if (i === numPaginas) {
                        callback(texto);
                    }
                });
            });
        }
    });
}

function adicionarHinosAoHTML(pdfText) {
    var hinosContainer = document.getElementById('hinos-container');
    var linhas = pdfText.split('\n');

    for (var i = 0; i < linhas.length; i++) {
        var linha = linhas[i];
        if (linha.startsWith('HINO')) {
            var hino = linha.substring(5).trim();
            var hinoElement = document.createElement('p');
            hinoElement.textContent = hino;
            hinosContainer.appendChild(hinoElement);
        }
    }
}

lerPDF('assets/hinos.pdf', adicionarHinosAoHTML);
