const cepInput = document.querySelector('#cep');
const btnPesquisarCEP = document.querySelector('#btnPesquisar');
const btnLimpar = document.querySelector('#btnLimpar');
const btnCopiar = document.querySelector('#btnCopiar');
const mensagemCopiado = document.querySelector('#mensagemCopiado');

const CEP_API_URL = 'https://viacep.com.br/ws/';

cepInput.addEventListener('input', (event) => {
    const value = cepInput.value.replace(/\D/g, '');
    cepInput.value = value;
});

const obterDadosApi = async (cep) => {
    try {
        const apiUrl = `${CEP_API_URL}${cep}/json/`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Erro na requisição da API');
        }

        const data = await response.json();

        if (data.erro) {
            alert("O CEP digitado está inválido");
            return;
        }

        atribuirCampos(data);
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
};

btnPesquisarCEP.addEventListener('click', (e) => {
    e.preventDefault();

    const cep = cepInput.value;

    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        cepInput.value = '';
        return;
    }

    obterDadosApi(cep);
});

const atribuirCampos = (data) => {
    document.querySelector("#rua").value = data.logradouro;
    document.querySelector("#complemento").value = data.complemento || '';
    document.querySelector("#bairro").value = data.bairro;
    document.querySelector("#cidade").value = data.localidade;
    document.querySelector("#estado").value = data.uf;
};

btnLimpar.addEventListener('click', () => {
    const fields = ['#cep', '#rua', '#complemento', '#bairro', '#cidade', '#estado'];
    fields.forEach(id => document.querySelector(id).value = '');
});

btnCopiar.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(cepInput.value);
        console.log('CEP copiado:', cepInput.value);
        if (mensagemCopiado) {
            mensagemCopiado.classList.remove('hide');
            setTimeout(() => {
                mensagemCopiado.classList.add('hide');
            }, 2000);
        } else {
            console.error('Elemento mensagemCopiado não encontrado.');
        }
    } catch (err) {
        alert('Falha ao copiar o CEP: ' + err);
    }
});
