setInterval(() => {
    const elementoQueQueroQueApareca = document.querySelector('.scroll');
    elementoQueQueroQueApareca.scrollIntoView();
    
}, 200);





let nomeUsuario; // nome do usuario inserido no menu de entrada; 
let usuario; //objeto usuario com somente o nome > usuario = {name: nomeUsuario}





function entrar() {
    //funcao que recebe o nome, envia para o servidor e salva; 
    //pegar nome do usuario digitado na caixinha INPUT; 
    nomeUsuario = document.querySelector ('.nome-escrever').value;
    usuario = {name: nomeUsuario};


    const addLoading = document.querySelector ('.divNome');
    addLoading.innerHTML = '';
    addLoading.innerHTML += '<div class="c-loader"></div>';
    const mudarTexto = document.querySelector ('.entrar');
    mudarTexto.innerHTML = '';
    mudarTexto.innerHTML += '<h3>Entrando...</h3>';
    
    setTimeout (enviarNome, 3000);
    manterConexao();
    mensagemEnviadaComSucesso ();

    setTimeout(() => {


    // entrada > selecionando o menu de entrada para desaparecer com ele assim que o nome for digitado; 
    const entrada = document.querySelector ('.caixa-entrada');
    //aparecer com o conteudo do bate-papo ao clicar em 'entrar';
    const chat = document.querySelector ('.conteudo');    
    if (nomeUsuario !== '') {
        //inverter: esconder o menu de entrada e aparecer com o chat; 
        entrada.classList.add ('esconder');
        chat.classList.remove ('esconder')
    }   //caso o nome não seja digitado, nada acontece, mesmo ao clicar no botao; 
        return;

    }, 3000);

}

function enviarNome () {
     //axios.post para enviar o conteudo do usuario para o servidor; 
     const enviar = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
     //quando enviar o usuario p/ API, executar receberUsuario; 
     enviar.then (receberUsuario); 
     //se der ruim, a funcao erro sera executada; 
     enviar.catch (erro);
}

//funcao executada assim que recebe usuario;
function receberUsuario () {
    //essa funcao recebe todo o conteudo(participantes) dentro do servidor, incluindo o enviado (usuario); 
    const receber = axios.get ('https://mock-api.driven.com.br/api/v6/uol/participants');
    //quando voltar com todos os participantes, executa receberUsuario2; 
    receber.then (addStatus);
    receber.catch (erroAnonimo);
    setTimeout (receberUsuario, 3000);
}

function aparecerStatus () {
    const status = document.querySelector ('.statusGeral');
    status.classList.remove ('esconder');
    const fundostatus = document.querySelector ('.fundostatus');
    fundostatus.classList.remove ('esconder');
    const statusṔeople = document.querySelector ('.statusṔeople');
    statusṔeople.classList.remove ('esconder');
}

function addStatus (item) {
    //console.log (item)
    //imprime todos os participantes do momento; 
    const participantes = item.data;
    //console.log (participantes);
    const addUsuarioOnline = document.querySelector ('.ulStatus');
    addUsuarioOnline.innerHTML = '';
    for (let i = 0; i < participantes.length; i++) {
        addUsuarioOnline.innerHTML += `<li>
        <div class="barrinhaOnline">
        <ion-icon class="icone-people" name="person-circle"></ion-icon>
        <div onclick="selecionarPeople(this)" class="onlinePeople">${participantes[i].name}</div>
        </div>
    </li>`  
    }
}






function voltarChat () {
    const barraStatus = document.querySelector ('.statusṔeople');
    const fundoStatus = document.querySelector ('.fundostatus');
    barraStatus.classList.add ('esconder');
    fundoStatus.classList.add ('esconder');
}



function erro (item) {
    if (item.status == "404") {
        alert ('Erro: 404; NOT FOUND')
    } else if (item.status == "400") {
        alert ('Erro: 400; BAD REQUEST')
    }
}








function manterConexao () {
    const statusOnline = axios.post ('https://mock-api.driven.com.br/api/v6/uol/status', usuario);
    statusOnline.then (deuCerto); 
    statusOnline.catch (deuErrado);
    setTimeout (manterConexao, 3000);

}

function deuCerto (item) {
    console.log ('Deu certo! Você está online.')
    //console.log (item)
}
function deuErrado (item) {
    console.log ('Este usuário não está mais conectado. A página será atualizada.');
    //console.log (item)
}




function erroAnonimo () {
    alert ('Ops! Algo deu errado e infelizmente não sabemos o que é. A página será atualizada.');
    //location.reload();
}








function mandarMensagem () {
    //pegar texto digitado dentro do bate papo
    let textoDigitado = document.querySelector ('.barra-escrever').value;
    console.log (textoDigitado)
    //para enviar uma mensagem:
    //primeiro: criar objeto com "quem esta escrevendo", "o que esta escrevendo". "para quem esta escrevendo", e "tipo de mensagem"; 
    //criar objeto que sera enviado para o servidor;
    let mensagemEnviada = {
        from: nomeUsuario,
        to: 'Todos',
        text: textoDigitado,
        type: "message"
    }

    //console.log (mensagemEnviada)
    //enviar informacoes para o servidor; 
    const enviarMensagem = axios.post ('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemEnviada);
    //se a mensagem for enviada para o servidor, executa a funcao mensagemEnviadaComSucesso
    enviarMensagem.then (mensagemEnviadaComSucesso); 
    enviarMensagem.catch (mensagemNaoeEnviada); 


}

function mensagemNaoeEnviada () {
    alert ('Mensagem não foi enviada. A página será atualizada');
    //location.reload();
}

function mensagemEnviadaComSucesso () {
    //console.log (item)
    console.log ('Mensagem enviada com sucesso');
    //pega de volta todas as mensagens enviadas no bate papo, inclusive a que voce enviou; 
    const mensagemRecebida = axios.get ('https://mock-api.driven.com.br/api/v6/uol/messages');
    //assim que pega as mensagens enviadas (incluindo a sua), executa addMensagemEscrita
    mensagemRecebida.then (addMensagemEscrita)
    mensagemRecebida.catch (erroAnonimo);
    
    setTimeout (mensagemEnviadaComSucesso, 3000);
}


function addMensagemEscrita (item) {
    //item.data é o array que contem todas as informacoes de todas as mensagens; 
    let mensagens = item.data; 
    //lugar no html onde serao add as mensagens; 
    const addElementos = document.querySelector ('.chat'); 
    addElementos.innerHTML = '';
    //ira percorrer cada objeto dentro da array; 
    for (let i = 0; i < mensagens.length; i++) {
        let mensagem = mensagens[i];
        //passando por cada item de mensagens
        if (mensagem.type == 'status') {
            //status sao mensagens de entrada ou saida de participantes; 
            //diferencas: type = status e add no class css referente a cor (type-status); 
            addElementos.innerHTML += `<li class="caixa-texto type-status">
            <div class="texto">
            <span class="horario">(${mensagem.time})</span>
            <span class="nome">${mensagem.from}</span>
            <span class="mensagem">${mensagem.text}</span>
            </div>
            </li>`
        } else if (mensagem.type == 'message') {
            //message sao mensagens de bate papo para todos verem; 
            //diferencas: type = message e add no class css referente a cor (type-message); 
            addElementos.innerHTML += `<li class="caixa-texto type-message">
            <div class="texto">
                <span class="horario">(${mensagem.time})</span>
                <span class="nome">${mensagem.from}</span>
                <span class="para">para</span>
                <span class="destinatario">${mensagem.to}:</span>
                <span class="mensagem">${mensagem.text}</span>
            </div>
        </li>`
        } else if (mensagem.type == 'private_message' && mensagem.to == nomeUsuario) {
            //private_message sao mensagens privadas; enviar mensagem privada mesmo é bonus; basta layout; 
            //diferencas: type = private_message e add no class css referente a cor (type-private_message);
            addElementos.innerHTML += `<li class="caixa-texto type-private_message">
            <div class="texto">
                <span class="horario">(${mensagem.time})</span>
                <span class="nome">${mensagem.from}</span>
                <span class="para">para</span>
                <span class="destinatario">${mensagem.to}:</span>
                <span class="mensagem">${mensagem.text}</span>
            </div>
        </li>` 
        }
    }
}