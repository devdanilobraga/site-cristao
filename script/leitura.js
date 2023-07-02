var bibleData = null;
        var selectedBookIndex = -1;
        var selectedChapterIndex = -1;
        var currentPage = 1; // Página atual
        var versesPerPage = 10; // Quantidade de versículos por página

        // Carregar os livros da Bíblia na barra lateral
        function loadBookList() {
          var bookListElement = document.getElementById('bookList');
          bookListElement.innerHTML = '';

          bibleData.forEach(function(book, index) {
            var listItem = document.createElement('li');
            listItem.textContent = book.name;
            listItem.onclick = function() {
              selectBook(index);
            };

            bookListElement.appendChild(listItem);
          });
        }

        // Selecionar um livro da Bíblia
        function selectBook(bookIndex) {
          selectedBookIndex = bookIndex;
          selectedChapterIndex = -1;
          currentPage = 1;
          updateBookTitle();
          updateChapterList();
          updateVerseList();
        }

        // Atualizar o título do livro selecionado
        function updateBookTitle() {
          var bookTitleElement = document.getElementById('bookTitle');
          if (selectedBookIndex !== -1) {
            bookTitleElement.textContent = bibleData[selectedBookIndex].name;
          } else {
            bookTitleElement.textContent = '';
          }
        }

        // Atualizar a lista de capítulos
        function updateChapterList() {
          var chapterListElement = document.getElementById('chapterList');
          chapterListElement.innerHTML = '';

          if (selectedBookIndex !== -1) {
            var chapters = bibleData[selectedBookIndex].chapters;

            chapters.forEach(function(chapter, index) {
              var listItem = document.createElement('button');
              listItem.textContent = 'Capítulo ' + (index + 1);
              listItem.onclick = function() {
                selectChapter(index);
              };

              chapterListElement.appendChild(listItem);
            });
          }
        }

        // Selecionar um capítulo
        function selectChapter(chapterIndex) {
          selectedChapterIndex = chapterIndex;
          currentPage = 1;
          updateVerseList();
        }

        // Atualizar a lista de versículos
        function updateVerseList() {
          var verseListElement = document.getElementById('verseList');
          verseListElement.innerHTML = '';

          if (selectedBookIndex !== -1 && selectedChapterIndex !== -1) {
            var verses = bibleData[selectedBookIndex].chapters[selectedChapterIndex];

            var startVerseIndex = (currentPage - 1) * versesPerPage;
            var endVerseIndex = startVerseIndex + versesPerPage;
            var visibleVerses = verses.slice(startVerseIndex, endVerseIndex);

            visibleVerses.forEach(function(verseText, index) {
              var verseNumber = startVerseIndex + index + 1;
              var listItem = document.createElement('p');
              listItem.textContent = 'Versículo ' + verseNumber + ': ' + verseText;

              verseListElement.appendChild(listItem);
            });

            displayPagination();
            // Exibir o número do capítulo
            var currentChapterElement = document.getElementById('currentChapter');
            currentChapterElement.textContent = 'Capítulo ' + (selectedChapterIndex + 1);
          }
        }

        // Exibir a paginação
        function displayPagination() {
          var paginationContainer = document.getElementById('paginationContainer');
          paginationContainer.innerHTML = '';

          if (selectedBookIndex !== -1 && selectedChapterIndex !== -1) {
            var verses = bibleData[selectedBookIndex].chapters[selectedChapterIndex];
            var totalPages = Math.ceil(verses.length / versesPerPage);

            for (var i = 1; i <= totalPages; i++) {
              var button = document.createElement('button');
              button.textContent = i;
              button.value = i;
              button.onclick = function() {
                currentPage = parseInt(this.value);
                updateVerseList();
              };

              paginationContainer.appendChild(button);
            }
          }
        }

        // Carregar os dados da Bíblia
        function loadBibleData() {
          var storedData = localStorage.getItem('biblia');
          if (storedData) {
            bibleData = JSON.parse(storedData);
            loadBookList();
          } else {
            fetch('assets/nvi.json')
              .then(response => response.json())
              .then(data => {
                bibleData = data;
                localStorage.setItem('biblia', JSON.stringify(data));
                loadBookList();
              })
              .catch(error => console.log(error));
          }
        }

        // Carregar os dados ao carregar a página
        window.onload = function() {
          loadBibleData();
        };