let misturasAcertadas = [];
let indicePasso = 0;
const coresPrimarias = ["blue","yellow","red"];
const cor1 = document.getElementById('cor1')
const cor2 = document.getElementById('cor2')


function sortearCor(){
    let indice = Math.floor(Math.random()*coresPrimarias.length)
    return coresPrimarias[indice]
}

function gerarCores(){
    let cor1, cor2, chave;
    let tentativas = 0;
    
    do{
        cor1 = sortearCor();
        cor2 = sortearCor();

        while (cor2 === cor1) {
            cor2 = sortearCor();
    }

    let cores = [cor1, cor2].sort();
    chave = cores + "-" + cores;

    tentativas++;

    } while (misturasAcertadas.includes(chave) && tentativas < 10);

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


function verificarProgresso(corClicada) {

    if (corClicada === corAlvoAtual) {
        const bolinhas = document.querySelector(".melodia1 .cores");

        if (bolinhas.length >= 2) {

            let cor1 = bolinhas.classList.replace('cor-', '');
            let cor2 = bolinhas.classList.replace('cor-', '');
            let chaveFinalizada = [cor1, cor2].sort().join("-");

            if (!misturasAcertadas.includes(chaveFinalizada)) {
            misturasAcertadas.push(chaveFinalizada);
            }

        }

        mostrarFeedback(true);

        if (misturasAcertadas.length >= 3) { 
            setTimeout(() => {
                document.querySelector(".melodia1").style.display = "none";
                document.getElementById("escolha").style.display = "flex";
            }, 1000);
        } else {
            setTimeout(novoDesafioSorteado, 1000);
        }
    } else {
        mostrarFeedback(false);
    }
}


function tocarArquivoMelodia1() {
    const audioCompleto = new Audio('AUDIO/melodia1.mp3'); 
    audioCompleto.play().catch(e => console.error("Erro ao tocar:", e));
    
    audioCompleto.onended = () => {
        alert("Gostou? Que tal a próxima agora ?");
    };
}

function prepararMelodia2() {
    alert("Preparando Melodia 2... (Adicione sua nova lista de fases aqui!)");
    location.reload();
}


function iniciarjogo(){
    console.log('botão clicado');
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    const jogo = document.getElementById('jogo');
    jogo.style.display = 'flex';

    novoDesafioSorteado();
    indicePasso = 0;
    misturasAcertadas();
   
}


function tocarSom(nota) {
    const audio = new Audio (`AUDIO/${nota}.mp3`);
    audio.play().catch(e => console.log("Erro ao tocar som:",e));
}

const teclas = document.querySelectorAll(".key");

teclas.forEach(tecla => {
    tecla.addEventListener("click", () => {
        const corEscolhida = tecla.dataset.color;
        const notaTocada = tecla.dataset.note;

        if (notaTocada) {
            tocarSom(notaTocada);
        }

        if (!corEscolhida) return;

        verificarProgresso(corEscolhida);

    });
});

function mostrarFeedback(sucesso) {
    const feedback = document.getElementById("feedback");
    if (!feedback) return;

    feedback.textContent = sucesso ? "Acertou! 🎉" : "Ops! Tente novamente. ❌";
    feedback.className = `feedback ${sucesso ? "acerto" : "erro"} show`;

    // Remove a mensagem depois de 1.2 segundos
    setTimeout(() => {
        feedback.className = "feedback";
    }, 1200);
}


function tocarArquivoMelodia1() {
    const audioCompleto = new Audio('AUDIO/melodia1.mp3');
    
    // 1. Defina aqui o tempo exato de cada nota da sua música (em milissegundos)
    // Exemplo: 500 = 0,5 segundos | 1000 = 1 segundo
    const mapaNotas = [

        { cor: "green", tempo: 0 },
        { cor: "green", tempo: 550 },
        { cor: "yellow", tempo: 1110 },
        { cor: "red2", tempo: 1940 },
        { cor: "pink", tempo: 2220 },
        { cor: "orange", tempo: 2250 },
        { cor: "green", tempo: 2770 },
        { cor: "purple", tempo: 3330 },

        { cor: "green", tempo: 4440 },
        { cor: "green", tempo: 5000 },
        { cor: "yellow", tempo: 5550 },
        { cor: "red2", tempo: 6380 },
        { cor: "pink", tempo: 6660 },
        { cor: "orange", tempo: 6940 },
        { cor: "green", tempo: 7220 },
        { cor: "purple", tempo: 7770 },

        { cor: "purple", tempo: 8880 },
        { cor: "red2", tempo: 9440 },
        { cor: "red2", tempo: 10000 },
        { cor: "red2", tempo: 10270 },
        { cor: "blue2", tempo: 10550 },
        { cor: "red2", tempo: 10830 },

        { cor: "pink", tempo: 11110 },
        { cor: "orange", tempo: 11660 },
        { cor: "green", tempo: 12770 },

        { cor: "pink", tempo: 13330 },
        { cor: "orange", tempo: 13880 },
        { cor: "orange", tempo: 14440 },
        { cor: "purple", tempo: 14720 },
        { cor: "blue", tempo: 15000 },

        { cor: "red", tempo: 15550},
        { cor: "red", tempo: 16110},
        // ... continue adicionando de acordo com o ritmo do seu MP3
    ];

    document.getElementById("escolha").style.display = "none";
    
    audioCompleto.play().then(() => {
        // Percorre o mapa e agenda o brilho de cada tecla
        mapaNotas.forEach(nota => {
            setTimeout(() => {
                document.querySelectorAll('.key').forEach(k => k.classList.remove('active-autoplay'));
                const tecla = document.querySelector(`.key[data-color="${nota.cor}"]`);
                if (tecla) {
                    tecla.classList.add('active-autoplay');
                    // Remove o brilho um pouco antes da próxima nota (ex: 300ms depois)
                    setTimeout(() => tecla.classList.remove('active-autoplay'), 250);
                }
            }, nota.tempo);
        });
    });

    audioCompleto.onended = () => {
        document.getElementById("escolha").style.display = "flex";
    };
}

let corAlvoAtual = ""; // Variável global para guardar a resposta certa

function novoDesafioSorteado() {
    const container = document.querySelector(".melodia1");
    if (!container) return;

    // 1. Limpa o painel
    container.innerHTML = "";

    // 2. Usa suas funções de sorteio
    const [c1, c2] = gerarCores();
    corAlvoAtual = misturarCores(c1, c2);

    // 3. Cria as bolinhas visualmente (Cor 1 + Cor 2)
    [c1, c2].forEach((cor, index) => {
        const novaBolinha = document.createElement("div");
        novaBolinha.className = `cores cor-${cor}`;
        container.appendChild(novaBolinha);

        if (index === 0) {
            const mais = document.createElement("span");
            mais.className = "mais";
            mais.textContent = "+";
            container.appendChild(mais);
        }
    });
}

function verificarProgresso(corClicada) {
    // Verifica se o usuário clicou na mistura certa das duas bolinhas
    if (corClicada === corAlvoAtual) {
        indicePasso++; // Contador de acertos
        mostrarFeedback(true);

        // Se ele acertar 5 vezes (ou o número que você quiser), libera a música
        if (indicePasso >= 5) { 
            document.querySelector(".melodia1").style.display = "none";
            document.getElementById("escolha").style.display = "flex";
        } else {
            // Sorteia o próximo desafio após um pequeno delay
            setTimeout(novoDesafioSorteado, 1000);
        }
    } else {
        mostrarFeedback(false);
    }
}
