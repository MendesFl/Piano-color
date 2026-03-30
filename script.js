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

      // ativa efeito pop
    cor1.classList.add('pop');
    cor2.classList.add('pop');

    // remove pop após 280ms para poder reaplicar depois
    setTimeout(() => {
        cor1.classList.remove('pop');
        cor2.classList.remove('pop');
    }, 280);3

    console.log("Resultado:", respostaCorreta);
}

function mostrarFeedback(acertou) {
    const feedback = document.getElementById("feedback");

    // Remove classes antigas e força reinício da animação
    feedback.classList.remove("show", "acerto", "erro");
    void feedback.offsetWidth;

    // Define tipo de feedback
    if (acertou) {
        feedback.textContent = "Acertou! 🎉";
        feedback.classList.add("acerto");
    } else {
        feedback.textContent = "Errou! ❌";
        feedback.classList.add("erro");
    }

    // Adiciona a classe show para animar
    feedback.classList.add("show");

    // Remove o feedback depois da animação
    setTimeout(() => {
        feedback.classList.remove("show", "acerto", "erro");
        feedback.textContent = "";
    }, 800);
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
            }, 1500);

        } else {
            mostrarFeedback(false);
        }
    });
});

