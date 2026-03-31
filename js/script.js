const fases_melodia1 = [
    {
    nome:"parte1",
    sequencia:["green", "yellow-orange","yellow-green"]
    },
    {
    nome:"parte2",
    sequencia:["green", "yellow-orange","blue"]
    },
    {
    nome:"parte3",
    sequencia:["green", "yellow-orange","red2","green","yellow-orange"]
    },
    {
    nome:"parte4",
    sequencia:["orange", "purple","orange","green"]
    },
    {
    nome:"parte5",
    sequencia:["green", "yellow-orange","yellow-green"]
    },
    {
    nome:"parte6",
    sequencia:["green", "yellow-orange","blue"]
    },
    {
    nome:"parte7",
    sequencia:["yellow-orange","green","blue2","yellow-green2","blue2"]
    },
    {
    nome:"parte8",
    sequencia:["red2","yellow-orange","green","red2"]
    }

];

let faseAtual = 0;
let indicePasso = 0;

function verificarProgresso(corClicada) {
    const melodiaDaFase = fases_melodia1[faseAtual].sequencia;

    if (corClicada === melodiaDaFase[indicePasso]) {
        indicePasso++;
        console.log("Acertou nota! Próximo passo:", indicePasso);

        if (indicePasso === melodiaDaFase.length) {
            console.log("Fase concluída! Chamando próxima fase...");
            mostrarFeedback(true);

            setTimeout(() => {
                proximaFase();
            }, 1500);
        }
    } else {
        console.log("Errou a nota!");
        mostrarFeedback(false);
    }
}

function proximaFase() {
    faseAtual++;
    indicePasso = 0;

    if (faseAtual < fases_melodia1.length) {
        console.log("Iniciando: " + fases_melodia1[faseAtual].nome);
        atualizarBolinhasNoPainel(); 
    } else {
        document.querySelector(".melodia1").style.display = "none";
        document.getElementById("escolha").style.display = "flex";

        mostrarFeedback(true);
        const fb = document.getElementById("feedback");
        if(fb) fb.textContent = "MELODIA CONCLUÍDA!";
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

function atualizarBolinhasNoPainel() {
    const coresNovaFase = fases_melodia1[faseAtual].sequencia;
    const container = document.querySelector(".melodia1");
    
    if(!container) return;

    // Limpa o que está lá
    container.innerHTML = "";

    // Cria as novas bolinhas dinamicamente
    coresNovaFase.forEach((cor, index) => {
        const novaBolinha = document.createElement("div");
        novaBolinha.className = `cores cor-${cor}`; // Usa a classe de cor correspondente
        container.appendChild(novaBolinha);

        // Adiciona o sinal de "+" entre elas, exceto na última
        if (index < coresNovaFase.length - 1) {
            const mais = document.createElement("span");
            mais.className = "mais";
            mais.textContent = "+";
            container.appendChild(mais);
        }
    });
}



function iniciarjogo(){
    console.log('botão clicado');
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    const jogo = document.getElementById('jogo');
    jogo.style.display = 'flex';

    faseAtual = 0;
    indicePasso = 0;
    
    atualizarBolinhasNoPainel();
   
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
        //part1 - 4
        { cor: "green", tempo: 0 },
        { cor: "yellow-orange", tempo: 550 },
        { cor: "yellow-green", tempo: 1110 },
        { cor: "green", tempo: 2220 },
        { cor: "yellow-orange", tempo: 2770 },
        { cor: "blue", tempo: 3330 },
        { cor: "green", tempo: 4440 },
        { cor: "yellow-orange", tempo: 5000 },
        { cor: "yellow-green", tempo: 5550  },
        { cor: "red2", tempo: 5583 },
        { cor: "green", tempo: 6250 },
        { cor: "yellow-orange", tempo: 6660 },
        { cor: "orange", tempo: 6694 },
        { cor: "purple", tempo: 7360 },
        { cor: "orange", tempo: 7770 },
        { cor: "green", tempo: 8880 },

        //part5-8
        

        // ... continue adicionando de acordo com o ritmo do seu MP3
    ];

    document.getElementById("escolha").style.display = "none";
    
    audioCompleto.play().then(() => {
        // Percorre o mapa e agenda o brilho de cada tecla
        mapaNotas.forEach(nota => {
            setTimeout(() => {
                const tecla = document.querySelector(`.key[data-color="${nota.cor}"]`);
                if (tecla) {
                    tecla.classList.add('active-autoplay');
                    // Remove o brilho um pouco antes da próxima nota (ex: 300ms depois)
                    setTimeout(() => tecla.classList.remove('active-autoplay'), 300);
                }
            }, nota.tempo);
        });
    });

    audioCompleto.onended = () => {
        document.getElementById("escolha").style.display = "flex";
    };
}