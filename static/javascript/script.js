document.querySelector('.form-search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    // VERIFICAÇÃO SE O CAMPO DO FORMULÁRIO ESTÁ VAZIO.
    if (!cityName) {
        document.querySelector('.weather').classList.remove('show');
        document.querySelector('.alert').classList.add('show');

        escreverCodigo(`
            <h3>Cidade não encontrada ou erro de digitação</h3>
            <img src="">
        `);
        return;
    }

    // OBTER DADOS DA API COM UMA FUNÇÃO ASSÍNCRONA (MÉTODOS: fetch --> async --> await)
    // ARMAZENAR A CHAVE DA API.
    const apiKey = 'a132c05c2cea8133adb747c216187d3c';

    // ENCODE URI --> CODIFICAR OS CARACTERES ESPECIAIS.
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const resultado = await fetch(apiUrl);
    const dadosApi = await resultado.json();

    // VERIFICAR O RETORNO DA API.
    if (dadosApi.cod === 200) {

        // EXTRAIR DADOS DA API EM UM NOVO OBJETO.
        mostraDados({
            city: dadosApi.name,
            country: dadosApi.sys.country,
            temp: dadosApi.main.temp,
            tempMax: dadosApi.main.temp_max,
            tempMin: dadosApi.main.temp_min,
            description: dadosApi.weather[0].description,
            tempIcon: dadosApi.weather[0].icon,
            windSpeed: dadosApi.wind.speed,
            humidity: dadosApi.main.humidity,
        });

    } else {

        document.querySelector('.weather').classList.remove('show');
        document.querySelector('.alert').classList.add('show');

        escreverCodigo(`
            <h3>Cidade não encontrada ou erro de digitação</h3>
            <img src="">
        `);

    }
});

function mostraDados(dadosApi) {

    // REMOVER O ALERTA DA INTERFACE.
    document.querySelector('.alert').classList.remove('show');

    // EXIBIR OS DADOS DO OBJETO RETORNADO.
    document.querySelector('.weather').classList.add('show');

    // OBTER OS ELEMENTOS E EXIBIR OS DADOS DO OBJETO NA INTERFACE.
    document.querySelector('.title').innerHTML = `${dadosApi.city}, ${dadosApi.country}`;

    document.querySelector('.temp_value').innerHTML = `${dadosApi.temp.toFixed(1).toString().replace('.', ',')}<sup>C°</sup>`;

    document.querySelector('.temp_description').innerHTML = `${dadosApi.description}`;

    document.querySelector('.temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${dadosApi.tempIcon}@2x.png`);

    document.querySelector('.temp_max').innerHTML = `${dadosApi.tempMax.toFixed(1).toString().replace('.', ',')}<sup>C°</sup>`;

    document.querySelector('.temp_min').innerHTML = `${dadosApi.tempMin.toFixed(1).toString().replace('.', ',')}<sup>C°</sup>`;

    document.querySelector('.humidity').innerHTML = `${dadosApi.humidity}%`;

    document.querySelector('.wind').innerHTML = `${dadosApi.windSpeed.toFixed(1)}Km/h`;
}

// FUNÇÃO PARA ESCREVER OS DADOS NA DIV alert.
function escreverCodigo(msg) {
    document.querySelector('.alert').innerHTML = msg;
}
