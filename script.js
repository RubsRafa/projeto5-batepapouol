
let nome; 
function entrar() {
    nome = document.querySelector ('.nome-escrever').value;
    const entrada = document.querySelector ('.caixa-entrada');
    const chat = document.querySelector ('.conteudo');    
    if (nome !== '') {
        entrada.classList.add ('esconder');
        chat.classList.remove ('esconder')
    } else {
        return;
    }
}


const enviar = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants ', {name: `${nome}`});
enviar.then (teste); 
console.log (enviar)

function teste (item) {
    console.log (item);
}

//function mandarMensagem (elemento) {
//    let textoParaEnviar = document.querySelector ('input').value;
//    console.log (textoParaEnviar);
//    console.log (elemento)
//
//    let usuario = {
//        from: `${nome}`,
//        to: 'Todos',
//        text: textoParaEnviar,
//        type: 'message'
//    }


//    const enviarElemento = document.querySelector ("ul");
//    enviarElemento.innerHTML += `<li class="caixa-texto">
//    <div class="texto">
//        <span class="horario"></span>
//        <span class="nome">${usuario.nome}</span>
//        <span class="para">para</span>
//        <span class="destinatario">${usuario.to}:</span>
//        <span class="mensagem">${usuario.text}</span>
//    </div>
//    </li>`

//    textoParaEnviar = ''; 
//
//    console.log (elemento);
//    console.log (enviarElemento)
//}
///////////////////////











const promesa = axios.get ('https://mock-api.driven.com.br/api/v6/uol/messages');
promesa.then (pegarConversas)

function pegarConversas (promisse) {
    let mensagens = promisse.data; 
    let listaMensagem = [];
    
    const addElementos = document.querySelector ('ul'); 

    for (let i = 0; i < mensagens.length; i++) {
        listaMensagem = mensagens[i];
        if (listaMensagem.type == 'status') {
            addElementos.innerHTML += `<li class="caixa-texto type-status">
            <div class="texto">
            <span class="horario">(${listaMensagem.time})</span>
            <span class="nome">${listaMensagem.from}</span>
            <span class="mensagem">${listaMensagem.text}</span>
            </div>
            </li>`
        } else if (listaMensagem.type == 'message') {
            addElementos.innerHTML += `<li class="caixa-texto type-message">
            <div class="texto">
                <span class="horario">(${listaMensagem.time})</span>
                <span class="nome">${listaMensagem.from}</span>
                <span class="para">para</span>
                <span class="destinatario">${listaMensagem.to}:</span>
                <span class="mensagem">${listaMensagem.text}</span>
            </div>
        </li>`
        } else if (listaMensagem.type == 'private_message') {
            addElementos.innerHTML += `<li class="caixa-texto type-private_message">
            <div class="texto">
                <span class="horario">(${listaMensagem.time})</span>
                <span class="nome">${listaMensagem.from}</span>
                <span class="para">para</span>
                <span class="destinatario">${listaMensagem.to}:</span>
                <span class="mensagem">${listaMensagem.text}</span>
            </div>
        </li>`
        }
    }
}

const rolarPapo = document.querySelector ('.chat');
rolarPapo.scrollIntoView();
setTimeout(pegarConversas, 1000); 