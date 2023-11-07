var divSelecionada;
var idSelecionado;

paginacao(0);

function paginacao(val) {

    divSelecionada = null
    idSelecionado = null

    var limite = 8;
    var comeco = val * limite;

    $.ajax({ //Requisição filtrada
        url: 'http://localhost:3000/pessoas?_start=' + comeco + '&_limit=' + limite,
        type: 'GET',
        success: function (dataFiltrada) {

            $.ajax({ //Requisição completa
                url: 'http://localhost:3000/pessoas',
                type: 'GET',
                success: function (data) {

                    var divPessoas = document.getElementById('pessoas');
                    var paginacao = document.getElementById('paginacao');

                    variaveluniversal = dataFiltrada;

                    divPessoas.innerHTML = "";
                    paginacao.innerHTML = "";

                    for (let i = 0; i < dataFiltrada.length; i++) {

                        var id = dataFiltrada[i].id != null ? dataFiltrada[i].id : "";
                        var nome = dataFiltrada[i].nome != null ? dataFiltrada[i].nome : "";
                        var paiId = dataFiltrada[i].paiId != null ? dataFiltrada[i].paiId : "";
                        var maeId = dataFiltrada[i].maeId != null ? dataFiltrada[i].maeId : "";

                        var pai = paiId != "" ? data.find(element => element.id == paiId) : "";
                        var mae = maeId != "" ? data.find(element => element.id == maeId) : "";

                        var paiNome = pai != "" && pai != null ? pai.nome : "";
                        var maeNome = mae != "" && mae != null ? mae.nome : "";

                        divPessoas.innerHTML += '<div class="btn btn-dark novaPessoa" id="pessoa' + id + '" onclick="selecionado(' + id + ')"><div class="id">' + id + '</div><h3 class="nome">Nome: ' + nome + '</h3><h4 class="pai">Pai: ' + paiNome + '</h4><h4 class="mae">Mãe: ' + maeNome + '</h4></div>';

                    }

                    valMax = data.length / 8

                    for (let i = val >= 1 ? val - 1 : val; i < val + 3 && i < valMax; i++) {

                        paginacao.innerHTML += '<button class="btn btn-dark" onclick="paginacao(' + (i) + ')">' + (i + 1) + '</button>'

                    }
                }
            })
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

    popularModal(id)

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

function adicionarPessoa() {

    var nome = $("#inputNome").val();
    var paiId = $("#inputPaiId").val();
    var maeId = $("#inputMaeId").val();


    if (nome == null || nome == "") {
        alert('O campo nome é obrigatório!')
        return
    }

    var novaPessoa = {
        nome: nome,
        paiId: paiId,
        maeId: maeId
    };

    $.ajax({
        url: 'http://localhost:3000/pessoas',
        type: 'POST',
        data: novaPessoa,
        success: function () {
            $("#modalAdd").modal('hide');
        }
    });
}

function popularModal(id) {

    $.ajax({
        url: 'http://localhost:3000/pessoas',
        type: 'GET',
        success: function (data) {
            var pessoa = data.find(element => element.id === id)
            $("#tituloModalEdit").html(pessoa.nome)
            $("#editNome").val(pessoa.nome)
            $("#editPaiId").val(pessoa.paiId)
            $("#editMaeId").val(pessoa.maeId)
        }
    })

    $('#modalEdit').modal('show');
}

function editarPessoa() {

    var nome = $("#editNome").val();
    var paiId = $("#editPaiId").val();
    var maeId = $("#editMaeId").val();


    if (nome == null || nome == "") {
        alert('O campo nome é obrigatório!')
        return
    }

    var pessoaEditada = {
        nome: nome,
        paiId: paiId,
        maeId: maeId
    };

    $.ajax({
        url: 'http://localhost:3000/pessoas/' + idSelecionado,
        type: 'PUT',
        data: pessoaEditada,
        success: function () {
            $('#modalEdit').modal('hide')
        }
    })

}