let nome = prompt ("Nome?")
while (nome == '') {
    alert ("Diz o nome aí velho")
    nome = prompt ("Nome?");
}
function addMensagens () {
    let listaMensagens = []; 

    const promessa = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nome});
    promessa.then (enviar)
    const resposta = axios.get ('https://mock-api.driven.com.br/api/v6/uol/messages');
    resposta.then (renderizarConversa)
    console.log (resposta);

    for (let i = 0; i < resposta.data.length; i++) {
        listaMensagens.push (resposta[i]);
    }
    return listaMensagens;

}
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

    const addElementos = document.querySelector ('ul');
    for (let i = 0; i <promisse.length; i++) {
        addElementos.innerHTML += `<li class="caixa-texto">
        <div class="texto">
            <span class="horario">${elementoHora}</span>
            <span class="nome">${elementoNome}</span>
            <span class="para">para</span>
            <span class="destinatario">${elementoParaQuem}:</span>
            <span class="mensagem">${elementoMensagem}</span>
        </div>
    </li>`
    }
    console.log (promisse)
}

function enviar () {
    const texto = document.querySelector ('.input').value;
    const enviarElemento = document.querySelector ("ul");
    enviarElemento.innerHTML += `<li class="caixa-texto">
    <div class="texto">
        <span class="horario">${elementoHora}</span>
        <span class="nome">${nome}</span>
        <span class="para">para</span>
        <span class="destinatario">${elementoParaQuem}:</span>
        <span class="mensagem">${texto}</span>
    </div>
</li>`

    
}
