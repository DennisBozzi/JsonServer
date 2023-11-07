var divSelecionada;
var idSelecionado;

exibirLista(1);

function exibirLista(val) {

    divSelecionada = null
    idSelecionado = null

    var limite = 8;
    var comeco = val * limite;


    $.ajax({
        url: 'http://localhost:3000/pessoas?_start=' + comeco + '&_limit=' + limite,
        type: 'GET',
        success: function (data) {

            var divPessoas = document.getElementById('pessoas');
            var paginacao = document.getElementById('paginacao');

            variaveluniversal = data;

            divPessoas.innerHTML = "";
            paginacao.innerHTML = "";

            for (let i = 0; i < data.length; i++) {

                var id = data[i].id != null ? data[i].id : ""
                var nome = data[i].nome != null ? data[i].nome : ""
                var paiId = data[i].paiId != null ? data[i].paiId : "";
                var maeId = data[i].maeId != null ? data[i].maeId : "";

                divPessoas.innerHTML += '<div class="btn btn-dark novaPessoa" id="pessoa' + id + '" onclick="selecionado(' + id + ')"><div class="id">' + id + '</div><h3 class="nome">Nome: ' + nome + '</h3><h4 class="pai">Pai: ' + paiId + '</h4><h4 class="mae">Mãe: ' + maeId + '</h4></div>';

            }

            for (let i = 0; i < 5; i++) {

                paginacao.innerHTML += '<button class="btn btn-dark" onclick="exibirLista(' + (i) + ')">' + (i + 1) + '</button>'

            }

        }
    });
}

function selecionado(id) {

    divSelecionada = divSelecionada != null ? divSelecionada.classList.remove('selected') : null

    divSelecionada = document.getElementById('pessoa' + id)

    divSelecionada.classList.add('selected')

    if (id == idSelecionado) {
        divSelecionada.classList.remove('selected')
        idSelecionado = null;
        divSelecionada = null;
        return
    }

    idSelecionado = id;

}

function removerPessoa() {

    if (idSelecionado != null && divSelecionada != null) {

        console.log('salame')
        $.ajax({
            url: 'http://localhost:3000/pessoas/' + idSelecionado,
            type: 'DELETE'
        })

    }
}

function adicionarPessoa(nome, paiId, maeId) {

    var novaPessoa = {
        nome: nome,
        paiId: paiId,
        maeId: maeId
    };

    $.ajax({
        url: 'http://localhost:3000/pessoas',
        type: 'POST', // Usar o método POST para adicionar uma nova pessoa
        data: JSON.stringify(novaPessoa), // Enviar a nova pessoa como JSON
        contentType: 'application/json',
        success: function (data) {
            console.log('Pessoa adicionada com sucesso:', data);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao adicionar pessoa:', error);
        }
    });
}

