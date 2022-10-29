let promisse
let requisicao;
let nome = {name: prompt("Qual o seu nome?")};
let mensagem = [];
escolherNome();
pegarMsg();

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
   
    setInterval(() => {
    promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promisse.then(carregarMsg);
    },3000);
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

            msg.innerHTML += `
        <li class="msg reservadamente">
            (${msgm.time}) ${msgm.from} reservadamente para ${msgm.to}: ${msgm.text}
        </li>
        `;

        }

        else {
            msg.innerHTML += `
        <li class="msg todos">
            (${msgm.time}) ${msgm.from} para ${msgm.to}: ${msgm.text}
        </li>
        `;
        }

    }

}

function verificarUsuarioOn(){
    requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
}

