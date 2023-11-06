var dados;

fetch('http://localhost:3000/pessoas')
    .then(req => req.json())
    .then(res => {
        dados = res
        popular()
    })

function popular() {

    var divPessoas = document.getElementById('pessoas');

    for (let i = 0; i < dados.length; i++) {
        divPessoas.innerHTML += '<div class="novaPessoa"><div class="id">' + dados[i].id + '</div><h1 class="nome">Nome: ' + dados[i].nome + '</h1><h2 class="pai">PaiId: ' + dados[i].paiId + '</h2><h2 class="mae">Mãe: ' + dados[i].maeId + '</h2></div>';
    }

}
