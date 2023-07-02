 // Variável global para armazenar as notas
 let notas = [];

 // Função para salvar a anotação no navegador do usuário
 function salvarAnotacao() {
     const notepad = document.getElementById('notepad');
     const anotacao = notepad.value.trim();

     if (anotacao === '') {
         alert('Digite uma anotação válida!');
         return;
     }

     // Adicionar a nova anotação ao array
     notas.push(anotacao);

     // Criar novo item de lista para a anotação
     const listItem = document.createElement('li');
     listItem.textContent = anotacao;
     listItem.addEventListener('click', function () {
         exibirAnotacao(notas.indexOf(anotacao));
     });

     const notepadList = document.getElementById('notepad-list');
     notepadList.appendChild(listItem);

     // Limpar o campo de texto e focar nele
     notepad.value = '';
     notepad.focus();

     alert('Anotação salva!');
 }

 // Função para exibir uma anotação selecionada
 function exibirAnotacao(index) {
     const notepad = document.getElementById('notepad');
     notepad.value = notas[index];

     // Desabilitar o campo de texto e adicionar a classe "read-only"
     notepad.disabled = true;
     document.getElementById('notepad-container').classList.add('read-only');
 }

 // Função para editar a anotação atual
 function editarAnotacao() {
     const notepad = document.getElementById('notepad');
     const index = notas.indexOf(notepad.value);

     if (index !== -1) {
         notepad.disabled = false;
         notepad.focus();
     }
 }

 // Função para apagar a anotação atual
 function apagarAnotacao() {
     const notepad = document.getElementById('notepad');
     const index = notas.indexOf(notepad.value);

     if (index !== -1) {
         notas.splice(index, 1);
         notepad.value = '';

         // Habilitar o campo de texto novamente e remover a classe "read-only"
         notepad.disabled = false;
         document.getElementById('notepad-container').classList.remove('read-only');
         atualizarListaAnotacoes();
     }
 }

 // Função para atualizar a lista de anotações
 function atualizarListaAnotacoes() {
     const notepadList = document.getElementById('notepad-list');
     notepadList.innerHTML = '';

     for (let i = 0; i < notas.length; i++) {
         const listItem = document.createElement('li');
         listItem.textContent = notas[i];
         listItem.addEventListener('click', function () {
             exibirAnotacao(i);
         });
         notepadList.appendChild(listItem);
     }
 }