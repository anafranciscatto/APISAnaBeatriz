// Seleciona o input de CEP e o botão de busca pelo ID
const numCep = document.querySelector('#num-cep');
const btnBuscar = document.querySelector('#btnBuscar');
// Seleciona a div onde os resultados serão exibidos
const resultadoDiv = document.querySelector('#resultado');

// Função para buscar informações do CEP na API do ViaCEP
const viaCEP = async (cep) => {
    // Constrói a URL da API com o CEP fornecido
    const urlApi = `https://viacep.com.br/ws/${cep}/json/`;
    // Faz uma requisição assíncrona à API
    const resposta = await fetch(urlApi);
    // Converte a resposta em formato JSON
    const dadosRetorno = await resposta.json();

    // Verifica se a resposta contém um erro
    if (dadosRetorno.erro) {
        // Se houver erro, exibe uma mensagem indicando que o CEP não foi encontrado
        resultadoDiv.innerHTML = "CEP não encontrado.";
    } else {
        // Se não houver erro, monta uma string com os dados do CEP
        resultadoDiv.innerHTML = `
            <p>CEP: ${dadosRetorno.cep}</p>
            <p>Logradouro: ${dadosRetorno.logradouro}</p>
            <p>Bairro: ${dadosRetorno.bairro}</p>
            <p>Cidade: ${dadosRetorno.localidade}</p>
            <p>Estado: ${dadosRetorno.uf}</p>
        `;
    }
}

// Adiciona um ouvinte de evento de clique no botão de busca
btnBuscar.addEventListener('click', async () => {
    // Obtém o valor do input de CEP e remove espaços em branco
    const cep = numCep.value.trim(); 
    // Verifica se o CEP está vazio
    if (cep.length === 0) {
        // Se estiver vazio, exibe uma mensagem pedindo para inserir um CEP válido
        resultadoDiv.innerHTML = "Por favor, insira um CEP válido.";
        return;
    }
    // Se o CEP não estiver vazio, chama a função viaCEP para buscar as informações do CEP
    await viaCEP(cep);
});
