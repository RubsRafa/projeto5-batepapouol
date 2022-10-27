let nome = prompt ("Nome"); 

function entrarServidor () {
    const usuario = {name:nome}
    const promessa = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants ', usuario);
    promessa.then (addMensagens)
}

function enviar () {
    const textoDigitado = document.querySelector (".barra-escrever").value;
    const chat = document.querySelector ("ul");
    chat.innerHTML += `<li class="caixa-texto">
    <div class="texto">
        <span class="horario">(00:00:00)</span>
        <span class="nome">${nome}</span>
        <span class="para"></span>
        <span class="destinatario"></span>
        <span class="mensagem">: ${textoDigitado}</span>
    </div>
</li>`
}

function addMensagens () {
    const resposta = axios.get ('https://mock-api.driven.com.br/api/v6/uol/messages');
    resposta.then (renderizarConversa)
    console.log (resposta);
}
scrollIntoview (addMensagens);
addMensagens();

function renderizarConversa (promisse) {
    const elementoHora = document.querySelector (".horario");
    const elementoNome = document.querySelector (".nome");
    const elementoParaQuem = document.querySelector (".destinatario");
    const elementoMensagem = document.querySelector (".mensagem");
    
    elementoHora.innerHTML = promisse.data.time; 
    elementoNome.innerHTML = promisse.data.from; 
    elementoParaQuem.innerHTML = promisse.data.to; 
    elementoMensagem.innerHTML = promisse.data.text; 

    console.log (promisse)
}