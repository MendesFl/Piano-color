let respostaCorreta = "";
const coresPrimarias = ["blue","yellow","red"];
const cor1 = document.getElementById('cor1')
const cor2 = document.getElementById('cor2')


function sortearCor(){
    let indice = Math.floor(Math.random()*coresPrimarias.length)
    return coresPrimarias[indice]
}

function gerarCores(){

    let cor1 = sortearCor();
    let cor2 = sortearCor();

    while (cor2 === cor1) {
        cor2 = sortearCor();
    }

    return [cor1,cor2]

}


function misturarCores(cor1, cor2) {
    const mistura = {
        "blue-yellow": "green",
        "blue-red": "purple",
        "red-yellow": "orange"
    };

    let cores = [cor1, cor2];
    cores.sort();

    let chave = cores[0] + "-" + cores[1];

    return mistura[chave];
}

function iniciarjogo(){
    console.log('botão clicado');
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    const jogo = document.getElementById('jogo');
    jogo.style.display = 'flex';


    let [corA, corB] = gerarCores();

    cor1.style.backgroundColor = corA;
    cor2.style.backgroundColor = corB;

     respostaCorreta = misturarCores(corA, corB);

    console.log("Resultado:", respostaCorreta);
}

function mostrarFeedback(acertou) {
    const feedback = document.getElementById("feedback");

    if (acertou) {
        feedback.textContent = "Acertou! 🎉";
        feedback.className = "ativo acerto";
    } else {
        feedback.textContent = "Errou! ❌";
        feedback.className = "ativo erro";
    }

    setTimeout(() => {
        feedback.className = "";
    }, 1500);
}

const teclas = document.querySelectorAll(".key");

teclas.forEach(tecla => {
    tecla.addEventListener("click", () => {
        const corEscolhida = tecla.dataset.color;

        // ignora teclas pretas 
        if (!corEscolhida) return;

        if (corEscolhida === respostaCorreta) {
            mostrarFeedback(true);

             setTimeout(() => {
                iniciarjogo();
                podeClicar = true;
            }, 1000);

        } else {
            mostrarFeedback(false);
        }
    });
});

