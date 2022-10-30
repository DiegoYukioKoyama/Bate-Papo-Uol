let promisse
let requisicao;
let nome = {name: prompt("Qual o seu nome?")};
let mensagem = [];
escolherNome();
pegarMsg();
setInterval(pegarMsg,3000);

let nomeUsuario = nome.name;

function escolherNome(){

    requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    requisicao.then(respostaPositiva);
    requisicao.catch(escolhaOutroNome);

}

function respostaPositiva(){
   setInterval(verificarUsuarioOn, 5000);
}

function escolhaOutroNome(erro){

    if(erro.response.status === 400){
    nome = {name: prompt("Nome já utilizado, por favor escolha outro nome")};
    escolherNome();

    }
}

function pegarMsg(){
   
    promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promisse.then(carregarMsg);
   
}

function carregarMsg(respostamsg){

    mensagem = respostamsg.data;
    const msg = document.querySelector(".container-msg");
    msg.innerHTML = "";

    for(i = 0; i < mensagem.length; i++){

        let msgm = mensagem[i];
        
        if(msgm.type === "status"){

        msg.innerHTML += `
        <li class="msg entra-sai">
            (${msgm.time}) ${msgm.from} ${msgm.text}
        </li>
        `;
        }

        else if(msgm.type === "private_message"){

            if(msgm.to === nome || msgm.from === nome){
                msg.innerHTML += `
                <li class="msg reservadamente">
                (${msgm.time}) ${msgm.from} reservadamente para ${msgm.to}: ${msgm.text}
                </li>
                `;
            }
        }

        else {
            msg.innerHTML += `
        <li class="msg todos">
            (${msgm.time}) ${msgm.from} para ${msgm.to}: ${msgm.text}
        </li>
        `;
        }

    }

    const elementoQueQueroQueApareca = document.querySelector('.ultimo');
    elementoQueQueroQueApareca.scrollIntoView();

}

function verificarUsuarioOn(){
    requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
}

function enviarMsg(){

    const msgEscrito = document.querySelector(".escrever").value;
    const novaMsg = {
        from: nomeUsuario,
        to: "Todos",
        text: msgEscrito,
        type: "message"
    }
    console.log(msgEscrito);
    requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMsg);
    requisicao.then(pegarMsg);
    requisicao.catch(recarregarPagina)
}

function recarregarPagina(){

    window.location.reload();

}

