ScrollReveal().reveal(`.logo`, { duration: 2000 });
ScrollReveal().reveal(`.text__header`, {
    rotate: { x: 0, y: 80, z: 0 },
    duration: 2000
});
ScrollReveal().reveal(`.container`, { duration: 2000 });

// OBTER O VALOR DOS CAMPOS.
const cepInput = document.querySelector('#cep');
const btnPesquisarCEP = document.querySelector('#btnPesquisar');
const btnLimpar = document.querySelector('#btnLimpar');

// EVENTO 'keypress' (QUANDO A TECLA É PRESSIONADA).
cepInput.addEventListener('keypress', (event) => {
    // OBTEM O CÓDIGO ASCII DA TECLA PRESSIONADA
    const keyCode = event.keyCode;

    // VERIFICA SE A TECLA PRESSIONADA NÃO É UM NÚMERO (CÓDIGO ASCII ENTRE 48 E 57)
    if (keyCode < 48 || keyCode > 57) {
        // SE NÃO FOR UM NÚMERO, CANCELA A ENTRADA E EXIBE UMA MENSAGEM PARA O USUÁRIO.
        event.preventDefault();
        alert("Digite apenas números.");
    }
});

const obterDadosApi = async (cep) => {
    // ARMAZENAR O ENDEREÇO DE REQUISIÇÃO DA API.
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    // ARAMAZENAR A RESPOSTA.
    const response = await fetch(apiUrl);

    // CONVERTER OS DADOS PARA JSON
    const data = await response.json();

    // VERIFICAR SE O CEP É VÁLIDO.
    if (data.erro) {
        alert("O CEP digitado está inválido");
        return;
    }
    atribuirCampos(data);
};

btnPesquisarCEP.addEventListener('click', (e) => {
    e.preventDefault();

    if (cepInput.value.length !== 8) {
        // MENOS OU MAIS DE 8 DÍGITOS, EXIBE UMA MENSAGEM PARA O USUÁRIO.
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        cepInput.value = '';
        return;
    }
    obterDadosApi(cepInput.value);
});

// ATRIBUIR DADOS DE RETORNO DA API PARA OS CAMPOS DO FORMULÁRIO.
const atribuirCampos = (data) => {
    const rua = document.querySelector("#rua");
    const complemento = document.querySelector("#complemento");
    const bairro = document.querySelector("#bairro");
    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");

    rua.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}

btnLimpar.addEventListener('click', () => {
    cepInput.value = '';
    document.querySelector('#rua').value = '';
    document.querySelector('#complemento').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';
});
