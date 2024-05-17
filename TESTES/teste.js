const numCep = document.querySelector('#num-cep');
const btnBuscar = document.querySelector('#btnBuscar');

const viaCEP = async (cep) => {
    const urlApi = `https://viacep.com.br/ws/${cep}/json/`;
    const resposta = await fetch(urlApi);
    const dadosRetorno = await resposta.json();
    console.log(dadosRetorno);
}

btnBuscar.addEventListener('click', async () => {
    const cep = numCep.value.trim(); // Obtém o valor do campo de CEP e remove espaços em branco
    if (cep.length === 0) {
        console.log("Por favor, insira um CEP válido.");
        return;
    }
    await viaCEP(cep);
});
