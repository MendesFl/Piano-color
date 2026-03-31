let misturasAcertadas = [];
let indicePasso = 0;
const coresPrimarias = ["blue","yellow","red"];
let faseAtual = 1;
let corAlvoAtual = ""; 

function sortearCor(){
    let indice = Math.floor(Math.random()*coresPrimarias.length);
    return coresPrimarias[indice];
}

function gerarCores(){
    let c1, c2, chave;
    let tentativas = 0;
    do {
        c1 = sortearCor();
        c2 = sortearCor();
        while (c2 === c1) {
            c2 = sortearCor();
        }
        let cores = [c1, c2].sort();
        chave = cores.join("-");
        tentativas++;
    } while (misturasAcertadas.includes(chave) && tentativas < 10);
    return [c1,c2];
}

function misturarCores(cor1, cor2) {
    const mistura = {
        "blue-yellow": "green",
        "blue-red": "purple",
        "red-yellow": "orange"
    };
    let cores = [cor1, cor2].sort();
    let chave = cores.join("-");
    return mistura[chave];
}

function iniciarjogo(){
    document.getElementById('menu').style.display = 'none';
    document.getElementById('jogo').style.display = 'flex';
    faseAtual = 1;
    indicePasso = 0;
    misturasAcertadas = []; 
    novoDesafioSorteado();
}

function novoDesafioSorteado() {
    const container = document.querySelector(".melodia1");
    if (!container) return;
    container.innerHTML = "";
    container.style.display = "flex"; // Garante que as bolinhas apareçam
    
    const [c1, c2] = gerarCores();
    corAlvoAtual = misturarCores(c1, c2);

    [c1, c2].forEach((cor, index) => {
        const novaBolinha = document.createElement("div");
        novaBolinha.className = "cores";
        novaBolinha.style.backgroundColor = cor;
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
    // Agora a comparação é direta e única
    if (corClicada === corAlvoAtual) {
        indicePasso++; 

        const bolinhas = document.querySelectorAll(".melodia1 .cores");

        if (bolinhas.length >= 2) {

            const cor1 = bolinhas[0].style.backgroundColor;
            const cor2 = bolinhas[1].style.backgroundColor;

            const chaveFinalizada = [cor1, cor2].sort().join("-");

            if (!misturasAcertadas.includes(chaveFinalizada)) {
                misturasAcertadas.push(chaveFinalizada);
            }
        }

        mostrarFeedback(true);

        // Se acertar 3 vezes, libera o menu de vitória
        if (indicePasso >= 3) { 
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


function reproduzirMusicaGanha() {
    if (faseAtual === 1) {
        tocarArquivoMelodia1();
    } else if (faseAtual === 2) {
        tocarArquivoMelodia2();
    } else if (faseAtual === 3) {
        tocarArquivoMelodia3();
    }
}

function tocarArquivoMelodia1() {
    const audio = new Audio('AUDIO/melodia1.mp3');
    const mapa = [
        { cor: "green", tempo: 0 }, 
        { cor: "green", tempo: 550 },
        { cor: "yellow", tempo: 1110 }, 
        { cor: "red2", tempo: 1940 },
        { cor: "pink", tempo: 2220 }, 
        { cor: "orange", tempo: 2500 },
        { cor: "green", tempo: 2770 }, 
        { cor: "purple", tempo: 3330 },

        { cor: "orange", tempo: 4440 }, 
        { cor: "orange", tempo: 5000 },
        { cor: "purple", tempo: 5550 }, 
        { cor: "red2", tempo: 6380 },
        { cor: "pink", tempo: 6660 }, 
        { cor: "orange", tempo: 6940 },
        { cor: "green", tempo: 7220 }, 
        { cor: "green", tempo: 7770 },

        { cor: "green", tempo: 8880 }, 
        { cor: "red2", tempo: 9440 },
        { cor: "red2", tempo: 10000 }, 
        { cor: "red2", tempo: 10270 },
        { cor: "blue2", tempo: 10550 }, 
        { cor: "red2", tempo: 10830 },
       
        { cor: "pink", tempo: 11110 }, 
        { cor: "red2", tempo: 11660 },
        { cor: "green", tempo: 12770 }, 

        { cor: "pink", tempo: 13330 },
        { cor: "orange", tempo: 13880 }, 
        { cor: "orange", tempo: 14440},
        { cor: "purple", tempo: 14720},
        { cor: "purple", tempo: 15000 }, 

        { cor: "red", tempo: 15550 },
        { cor: "red", tempo: 16140 }

    ];
    animarTeclado(audio, mapa);
}

function tocarArquivoMelodia2() {
    const audio = new Audio('AUDIO/melodia2.mp3'); 
    const mapa2 = [
        { cor: "red", tempo: 0 }, 
        { cor: "red", tempo: 520 },
        { cor: "green", tempo: 1140 }, 
        { cor: "green", tempo: 1660 },
        { cor: "orange", tempo: 2220 }, 
        { cor: "orange", tempo: 2810 },
        { cor: "green", tempo: 3330 },

        { cor: "purple", tempo: 4440 }, 
        { cor: "purple", tempo: 5000 },
        { cor: "yellow", tempo: 5550 }, 
        { cor: "yellow", tempo: 6110 },
        { cor: "blue", tempo: 6660 }, 
        { cor: "blue", tempo: 7220 },
        { cor: "red", tempo: 7770 },

        { cor: "green", tempo: 8880 }, 
        { cor: "green", tempo: 9440 },
        { cor: "purple", tempo: 10000 }, 
        { cor: "purple", tempo: 10550 },
        { cor: "yellow", tempo: 11110 }, 
        { cor: "yellow", tempo: 11660 },
        { cor: "blue", tempo: 12220 },

        { cor: "green", tempo: 13330 }, 
        { cor: "green", tempo: 13880 },
        { cor: "purple", tempo: 14440 }, 
        { cor: "purple", tempo: 15000 },
        { cor: "yellow", tempo: 15550 }, 
        { cor: "yellow", tempo: 16110 },
        { cor: "blue", tempo: 16660 }
    ];
    animarTeclado(audio, mapa2);
}

function tocarArquivoMelodia3() {
    const audio = new Audio('AUDIO/melodia3.mp3'); 
    const mapa3 = [
        { cor: "purple2", tempo: 0 }, 

        { cor: "blue2", tempo: 550 },
        { cor: "orange", tempo: 830 }, 
        { cor: "red2", tempo: 1110 },
        { cor: "blue2", tempo: 1380 }, 

        { cor: "purple2", tempo: 1940 },
        
        { cor: "yellow2", tempo: 2500 }, 
        { cor: "purple2", tempo: 2770 }, 
        { cor: "blue2", tempo: 3050 },
        { cor: "orange", tempo: 3330 }, 
        { cor: "red2", tempo: 3600 },
        
        { cor: "purple2", tempo: 4160 },

        { cor: "purple2", tempo: 4720 },
        { cor: "yellow2", tempo: 5000 },
        { cor: "purple2", tempo: 5270 },
        { cor: "orange2", tempo: 5550 },
        { cor: "yellow2", tempo: 6110 },
        { cor: "purple2", tempo: 6380 },
        { cor: "purple2", tempo: 6940 },
        { cor: "yellow2", tempo: 7220 },
        { cor: "blue2", tempo: 7530 },
        { cor: "red2", tempo: 7770 },
        { cor: "yellow2", tempo: 8330 },

        { cor: "purple2", tempo: 8880 }, 

        { cor: "blue2", tempo: 9440 },
        { cor: "orange", tempo: 9720 }, 
        { cor: "red2", tempo: 10000 },
        { cor: "blue2", tempo: 10270 }, 

        { cor: "purple2", tempo: 10860 },
        
        { cor: "yellow2", tempo: 11380 }, 
        { cor: "purple2", tempo: 11700 }, 
        { cor: "blue2", tempo: 11940 },
        { cor: "orange", tempo: 12220 }, 
        { cor: "red2", tempo: 12530 },
        
        { cor: "yellow2", tempo: 13050 },
        { cor: "purple2", tempo: 13610 },
        { cor: "yellow2", tempo: 13880 },
        { cor: "purple2", tempo: 14160 },
        { cor: "orange2", tempo: 14440 },
        { cor: "orange2", tempo: 15000 },
        { cor: "pink2", tempo: 15240 },
        { cor: "orange2", tempo: 15590 },
        { cor: "green2", tempo: 16110 },
        { cor: "purple2", tempo: 16660 },
        { cor: "yellow2", tempo: 17220 }
    ];
    animarTeclado(audio, mapa3);
}

function animarTeclado(audio, mapa) {
    document.getElementById("escolha").style.display = "none";
    audio.play().then(() => {
        mapa.forEach(nota => {
            setTimeout(() => {
                document.querySelectorAll('.key').forEach(k => k.classList.remove('active-autoplay'));
                const tecla = document.querySelector(`.key[data-color="${nota.cor}"]`);
                if (tecla) {
                    tecla.classList.add('active-autoplay');
                    setTimeout(() => tecla.classList.remove('active-autoplay'), 250);
                }
            }, nota.tempo);
        });
    });
    audio.onended = () => document.getElementById("escolha").style.display = "flex";
}

function prepararMelodia2() {
    faseAtual = 2;
    indicePasso = 0;
    misturasAcertadas = [];
    document.getElementById("escolha").style.display = "none";
    novoDesafioSorteado();
}

function mostrarFeedback(sucesso) {
    const f = document.getElementById("feedback");
    f.textContent = sucesso ? "Acertou! 🎉" : "Ops! Tente novamente. ❌";
    f.className = `feedback ${sucesso ? "acerto" : "erro"} show`;
    setTimeout(() => { f.className = "feedback"; }, 1200);
}

function tocarSom(nota) {
    new Audio(`AUDIO/${nota}.mp3`).play().catch(() => {});
}

document.querySelectorAll(".key").forEach(tecla => {
    tecla.addEventListener("click", () => {
        tocarSom(tecla.dataset.note);
        if (tecla.dataset.color) {verificarProgresso(tecla.dataset.color);
    // 2. Usa suas funções de sorteio
   
        }
    });
});

function prepararMelodia3() {
    faseAtual = 3; // Define a nova fase
    indicePasso = 0; // Reseta os acertos
    misturasAcertadas = []; // Limpa o histórico de misturas
    
    document.getElementById("escolha").style.display = "none"; // Esconde o menu de vitória
    document.querySelector(".melodia1").style.display = "flex"; // Mostra as bolinhas de novo
    
    novoDesafioSorteado(); // Sorteia o primeiro desafio da fase 3
}

function proximaFaseLogica() {
    if (faseAtual === 1) {
        prepararMelodia2();
    } else if (faseAtual === 2) {
        prepararMelodia3();
    } else {
        alert("Parabéns! Você completou todas as músicas!");
    }
}