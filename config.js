let contador = -1;


function analisarStorage() {
    let cards = localStorage.getItem('eventosCadastrados');

    if (cards != null) {
        cards = JSON.parse(cards);
        cards.forEach((element, index) => {
            contador++;
            let maximoCaracteresTitulo = 30;

            if (element.titulo.length > maximoCaracteresTitulo) {
                element.titulo = element.titulo.slice(0, maximoCaracteresTitulo) + "...";
            }

            document.getElementById('box').innerHTML += `
            <div class="card-assunto" id='card-${contador}'>
                    <div class="col-md-12">
                        <h4>${element.titulo}</h4>
                    </div>
                    <div class="col-md-12">
                        <span>${element.descricao}</span>
                    </div>
                    <div class="datas">
                        <div class="col-md-12">
                            <p><i>Data-Início:</i>${element.data_inicio}<i> ás </i>${element.hora_inicio}</p>
                        </div>
                        <div class="col-md-12">
                            <p><i>Data-Fim:</i><span id='data_fim-${contador}'>${element.data_fim}</span><i> ás </i><span id='hora_fim-${contador}'>${element.hora_fim}</span></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button class="button-padrao concluir" onclick="concluir(${index})">Concluir</button>
                        <button class="button-padrao apagar" onclick="concluir(${index})">Apagar</button>
                    </div>
            </div>`;


        });
    }
}


function cadastrar() {

    // Estou pegando todos os dados das inputs e setando dentro desse obj
    let dados = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        data_inicio: document.getElementById('data-inicio').value,
        hora_inicio: document.getElementById('hora-inicio').value,
        data_fim: document.getElementById('data-fim').value,
        hora_fim: document.getElementById('hora-fim').value
    }


    let separandoInicio = dados.data_inicio.split('-');
    dados.data_inicio = `${separandoInicio[2]}/${separandoInicio[1]}/${separandoInicio[0]}`;


    let separandoFim = dados.data_fim.split('-');
    dados.data_fim = `${separandoFim[2]}/${separandoFim[1]}/${separandoFim[0]}`;

    let eventosCadastrados = localStorage.getItem('eventosCadastrados');
    if (eventosCadastrados == null) {
        eventosCadastrados = [];
    } else {
        eventosCadastrados = JSON.parse(eventosCadastrados);
    }

    // Aqui estou pegando o obj e setando dentro desse array
    eventosCadastrados.push(dados);

    // Aqui estou tranformando o json numa string
    let cadastrados = JSON.stringify(eventosCadastrados);

    //armazena a string no LocalStorage
    localStorage.setItem("eventosCadastrados", cadastrados);

    this.criarElemento(dados);

    location.reload();

}

function criarElemento(dados) {
    contador++;

    let card = document.getElementById('box').innerHTML += `
    <div class="card-assunto" id='card-${contador}'>
        <div class="col-md-12">
            <h4>${dados.titulo}</h4>
        </div>
        <div class="col-md-12">
            <span>${dados.descricao}</span>
        </div>
        <div class="datas">
            <div class="col-md-12">
                <p><i>Data-Início:</i> ${dados.data_inicio} <i> ás </i> ${dados.hora_inicio}</p>
            </div>
            <div class="col-md-12">
                <p><i>Data-Fim:</i><span id='data_fim-${contador}'>${dados.data_fim}<span><i> ás </i><span id='hora_fim-${contador}'>${dados.hora_fim}</span></p>
            </div>
        </div>
        <div class="col-md-12">
            <button class="button-padrao concluir">Concluir</button>
            <button class="button-padrao apagar">Apagar</button>
        </div>
    </div>`;
    return card;

}

function verificaCampos() {
    let inputs = document.querySelectorAll('.input-geral');
    let inputsPreenchidas = 0;

    inputs.forEach((element, index) => {
        let valor = document.getElementsByClassName('input-geral')[index].value;
        if (valor == '') {
            document.getElementsByClassName('input-geral')[index].style.border = '1px solid red';
            return;
        } else {
            inputsPreenchidas++;
        }

    });

    if (inputsPreenchidas == inputs.length) {
        this.cadastrar();
    }


}





function concluir(indexCard) {
    // Remover card
    document.getElementById(`card-${indexCard}`).remove();
    let dadosRegistrados = [];


    let dados = JSON.parse(localStorage.getItem('eventosCadastrados'));

    dados.forEach((element, index) => {
        if (index != indexCard) {
            dadosRegistrados.push(element);
        }
    });


    let registros = JSON.stringify(dadosRegistrados);

    localStorage.setItem("eventosCadastrados", registros);


}



